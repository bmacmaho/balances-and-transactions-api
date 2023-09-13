export function isValidDate(dateString: string): boolean {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    return datePattern.test(dateString);
}

export function removeTimeFromDate(isoDateString: string): string {
	const parts = isoDateString.split('T');
	if (parts.length >= 1) {
		return parts[0];
	} else {
		return isoDateString; // Return the original string if 'T' is not found.
	}
}

export function goBackOneDay(inputDate: string) {
	const dateParts = inputDate.split('-');
	if (dateParts.length !== 3) {
		throw new Error('Invalid date format. Use YYYY-MM-DD.');
	}

	const year = parseInt(dateParts[0]);
	const month = parseInt(dateParts[1]);
	let day = parseInt(dateParts[2]);

    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() - 1);
	const newDate = date.toISOString().split('T')[0];

	return newDate;
}

export function goForwardOneDay(inputDate: string) {
    const dateParts = inputDate.split('-');
	if (dateParts.length !== 3) {
		throw new Error('Invalid date format. Use YYYY-MM-DD.');
	}

	const year = parseInt(dateParts[0]);
	const month = parseInt(dateParts[1]);
	let day = parseInt(dateParts[2]);

    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() + 1);
	const newDate = date.toISOString().split('T')[0];

	return newDate;
}