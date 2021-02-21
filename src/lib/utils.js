export const forwardTo = (location, history, historyState = null) => {
	if (location === history?.location?.pathname) {
		// prevent to push same path to the history object multiple times in the row
		history.replace(location, historyState)
		return
	}
	
  history.push(location, historyState)
}