class HistoryService {
	
	constructor(previousBtn,nextBtn) {
		this._previousBtn = previousBtn;
		this._nextBtn = nextBtn;
		this._current = null;
		this._history = [];
	}
	
	setHistory(datas, options) {
		if(options.reset===true) {
			this._history.length = 0;
			this._history.push(datas);
			this.setCurrent(this._history.length-1);
			this._previousBtn.disabled = true;
			this._nextBtn.disabled = true;
		} else {
			if(this.getCurrent()===this._history.length-1) {
				if(this._history.push(datas) > 50) {
					this._history.shift();
				}
			} else {
				this._history.splice(this.getCurrent()+1);
				this._history.push(datas);
			}
			this.setCurrent(this._history.length-1);
			this._previousBtn.disabled = false;
			this._nextBtn.disabled = true;
		}
		console.log(this._history);
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
