class HistoryService {
	
	constructor(previousBtn,nextBtn) {
		this._previousBtn = previousBtn;
		this._nextBtn = nextBtn;
		this._current = null;
		this._history = [];
	}
	
	setHistory(data, options) {
		if(options.reset===true) {
			this._history.length = 0;
			this._history.push(data);
			this.setCurrent(this._history.length-1);
			this._previousBtn.disabled = true;
			this._nextBtn.disabled = true;
		} else {
			if(this.getCurrent()===this._history.length-1) {
				if(this._history.push(data) > 50) {
					this._history.shift();
				}
			} else {
				this._history.splice(this.getCurrent()+1);
				this._history.push(data);
			}
			this.setCurrent(this._history.length-1);
			this._previousBtn.disabled = false;
			this._nextBtn.disabled = true;
		}
	}
	
	getHistory()  {
		return this._history;
	}
	
	setCurrent(curr) {
		this._current = curr;
	}
	
	getCurrent()  {
		return this._current;
	}
	
}
