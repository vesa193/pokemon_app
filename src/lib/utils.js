export const forwardTo = (location, history, historyState = null) => {
	if (location === history?.location?.pathname) {
		// prevent to push same path to the history object multiple times in the row
		history.replace(location, historyState)
		return
	}
	
  history.push(location, historyState)
}

export function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}