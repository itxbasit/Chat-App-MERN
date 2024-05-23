export default function convertToRelativeTime(isoDateString) {
    const date = new Date(isoDateString);
    const now = new Date();

    const diffMilliseconds = now - date;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);

    if (diffSeconds < 60) {
        return "Just now";
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
        return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
        return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) {
        return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    }

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) {
        return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
    }

    const diffYears = Math.floor(diffMonths / 12);
    return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}
