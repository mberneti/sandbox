export const processState = {
  IsNotArrived: "IsNotArrived",
  IsReady: "IsReady", // ready queue
  IsActive: "IsActive", // cpu queue
  IsCompleted: "IsCompleted" // completed
};

function FCFSScheduler(tasks) {
  //{arrivalTime,burstTime,waitingTime=0, state:'',excutionDuration:''}
  this.tasks = tasks.map((x, i) => {
    x.id = "P" + (i + 1);
    x.waitingTime = 0;
    x.executionDuration = 0;
    x.state = processState.IsNotArrived;
    return x;
  });

  this.counter = 0;
  this.cpuProcessId = null;
  this.history = [];
}

FCFSScheduler.prototype = {
  get: function(id) {
    return this.tasks.find(x => x.id === id);
  },
  updateState: function(id, state) {
    const objIndex = this.tasks.findIndex(obj => obj.id === id);
    this.tasks[objIndex].state = state;
  },
  hasNotCompleted: function() {
    return this.tasks.some(x => x.state !== processState.IsCompleted);
  },
  setBestCandidate: function() {
    if (this.hasNotCompleted()) {
      const bestProcess = this.tasks
        .filter((x, i) => x.state === processState.IsReady)
        .sort((first, second) => first.arrivalTime - second.arrivalTime)[0];

      this.updateState(bestProcess.id, processState.IsActive);

      this.cpuProcessId = bestProcess.id;
    } else {
      this.cpuProcessId = null;
    }
    this.log(`Context Switch`);
  },
  checkCpuState: function() {
    if (this.cpuProcessId !== null) {
      const currentCpuProcess = this.get(this.cpuProcessId);
      if (currentCpuProcess.burstTime === currentCpuProcess.executionDuration) {
        this.updateState(this.cpuProcessId, processState.IsCompleted);
        this.setBestCandidate();
      }
    } else {
      this.setBestCandidate();
    }
  },
  updateReadyQueue: function() {
    const ATBiggerThanCounter = x => x.arrivalTime >= this.counter;
    const isNotArrived = x => x.state === processState.IsNotArrived;

    this.tasks = this.tasks.map(x => {
      if (ATBiggerThanCounter(x) && isNotArrived(x))
        x.state = processState.IsReady;
      return x;
    });
  },
  inCreaseCounter: function() {
    this.counter++;
    this.tasks = this.tasks.map(x => {
      if (x.state === processState.IsActive) {
        x.executionDuration++;
      } else if (x.state === processState.IsReady) {
        x.waitingTime++;
      }
      return x;
    });
    this.log(`Increase Counter`);
  },
  checkState: function() {
    this.log(`Check State: ` + this.counter);
  },
  schdule: function(params) {
    while (this.hasNotCompleted()) {
      this.updateReadyQueue();

      this.checkCpuState();

      this.inCreaseCounter();
    }
  },
  log: function(label) {
    let cpu = null;
    if (this.cpuProcessId) cpu = this.get(this.cpuProcessId);

    let temp = this.tasks.map(x => ({ ...x }));
    this.history.push({ label, tasks: temp, cpu: cpu && { ...cpu } });
  },
  getLogs: function() {
    this.log(`start`);
    this.schdule();

    this.log(`done`);
    return this.history;
  }
};

export default FCFSScheduler;
