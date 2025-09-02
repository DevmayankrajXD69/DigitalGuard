// IP-based storage utility for action steps progress
class IPStorage {
    constructor() {
        this.storageKey = 'digitalFootprintProgress';
        this.weeklyResetKey = 'lastResetDate';
        this.ipKey = 'userIP';
        this.init();
    }

    async init() {
        await this.getUserIP();
        this.checkWeeklyReset();
    }

    async getUserIP() {
        try {
            // Use a free IP service
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            this.userIP = data.ip;
            localStorage.setItem(this.ipKey, this.userIP);
        } catch (error) {
            // Fallback to stored IP or generate a session ID
            this.userIP = localStorage.getItem(this.ipKey) || this.generateSessionID();
            localStorage.setItem(this.ipKey, this.userIP);
        }
    }

    generateSessionID() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    checkWeeklyReset() {
        const lastReset = localStorage.getItem(this.weeklyResetKey);
        const now = new Date();
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

        if (!lastReset || (now.getTime() - parseInt(lastReset)) > oneWeek) {
            this.resetProgress();
            localStorage.setItem(this.weeklyResetKey, now.getTime().toString());
        }
    }

    resetProgress() {
        const allKeys = Object.keys(localStorage);
        allKeys.forEach(key => {
            if (key.startsWith(this.storageKey)) {
                localStorage.removeItem(key);
            }
        });
    }

    getStorageKey() {
        return `${this.storageKey}_${this.userIP}`;
    }

    saveProgress(data) {
        localStorage.setItem(this.getStorageKey(), JSON.stringify({
            data: data,
            timestamp: Date.now(),
            ip: this.userIP
        }));
    }

    loadProgress() {
        const stored = localStorage.getItem(this.getStorageKey());
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                return parsed.data;
            } catch (error) {
                console.error('Error parsing stored progress:', error);
                return null;
            }
        }
        return null;
    }

    getLastUpdateTime() {
        const stored = localStorage.getItem(this.getStorageKey());
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                return new Date(parsed.timestamp);
            } catch (error) {
                return null;
            }
        }
        return null;
    }
}

// Export for use in other files
window.IPStorage = IPStorage;