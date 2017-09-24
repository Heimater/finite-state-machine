class FSM {
   
    /**
     * Creates new FSM instance.Создает новый экземпляр FSM.
     * @param config.
     */
    constructor(config) {
        this.config = config;
        this.allStates = [config.initial];
        this.arrayLost = [];
    }

    /**
     * Returns active state.Возвращает активное состояние.
     * @returns {String}
     */
    getState() {
        return this.allStates[this.allStates.length - 1];
    }

    /**
     * Goes to specified state.Переход к указанному состоянию.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.allStates.push(state);
            this.arrayLost = [];
        } else {
            throw Error('state isn\'t exist');
        }
    }

    /**
     * Changes state according to event transition rules.
     Изменения изменяются в соответствии с правилами перехода событий.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.getState()].transitions[event]) {
            this.allStates.push(this.config.states[this.getState()].transitions[event]);
            this.arrayLost = [];
        } else {
            throw Error('event isn\'t exist');
        }
    }

    /**
     * Resets FSM state to initial.Сбрасывает состояние FSM в исходное состояние.
     */
    reset() {
        this.allStates = [this.config.initial];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     Возвращает массив состояний, для которых указаны указанные правила перехода к событиям.
     * Returns all states if argument is undefined. Возвращает все состояния, 
     если аргумент не определен.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            const array = [];
            for (let state in this.config.states) {
                array.push(state);
            }
            return array; 
        } else {
            const array = [];
            for (let state in this.config.states) {
                if (this.config.states[state].transitions[event]) {
                    array.push(state);
                }
            }
            return array;
        }
    }

    /**
     * Goes back to previous state. Возврат к предыдущему состоянию.
     * Returns false if undo is not available. Возвращает false,
      если отмена недоступна.
     * @returns {Boolean}
     */
    undo() {
        if (this.allStates.length === 1) {
            return false;
        } 
        this.arrayLost.push(this.allStates.pop());
        return true;
    }

    /**
     * Goes redo to state. Возврат в состояние из которого сделалаи undo
     * Returns false if redo is not available. Возвращает false, 
     если повтор недоступен.
     * @returns {Boolean}
     */
    redo() {
        if (this.arrayLost.length === 0) {
            return false;
        }
        this.allStates.push(this.arrayLost.pop());
        return true;
    }
-
    /**
     * Clears transition history. Очищает историю перехода
     */
    clearHistory() {
        this.allStates = [this.config.initial];
        this.arrayLost = [];  
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halusnevwmpofeofm **/
