class HistoryService {
	
	constructor(undoBtn,redoBtn) {
		this._undoBtn = undoBtn;
		this._redoBtn = redoBtn;
		this._current = null;
		this._history = [];
	}
	
	setHistory(datas, options) {//addition to history array
		if(options.reset===true) {// when init or new => delete existing history and add blank canvas to it
			this._history.length = 0;
			this._history.push(datas);
			this.setCurrent(0);//current = last and only = blank canvas
			this._undoBtn.disabled = true;
			this._redoBtn.disabled = true;
		} else {
			if(this.getCurrent()===this._history.length-1) {//if current === last state
				if(this._history.push(datas) > 100) {//maximum 100 states, which is more than too much !
					this._history.shift();//if > 100 => delete first
				}
			} else {//if current < last state
				this._history.splice(this.getCurrent()+1);//delete all subsequent states
				this._history.push(datas);//add new state after current
			}
			this.setCurrent(this._history.length-1);//when addition to history array => current = last
			this._undoBtn.disabled = false;
			this._redoBtn.disabled = true;
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
