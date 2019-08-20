function Node (employeeId, name, children) {
    this.employeeId = employeeId;
    this.name = name;
    this.children = children;
}
let orgChart = new Node(null, null, {});

/**
  * This function find the employee in the organization chart.
  * @method findEmployee
  * @param {Object} node
  * @param {String} employeeId
  * @return {Bool or Object} Returns an employee node if found else return false
  */
function findEmployee(node, employeeId) {
  if(employeeId === -1) return false;
  if(!node || !node.children) return false;
  if(node.children[employeeId]) return node.children[employeeId];
  let employee = Object.keys(node.children);
  if(!employee.length) return false;
  for(let n of employee) {
    return findEmployee(node.children[n], employeeId);
  }
}

/**
 * This function add the employee inside the organization chart under given manager.
 * @method addEmployee
 * @param {String} employeeId
 * @param {String} name
 * @param {String} managerId
 */
function addEmployee(employeeId, name, managerId) {
  if(findEmployee(orgChart, employeeId)) return;
  const manager = findEmployee(orgChart, managerId);
  let employee = new Node(employeeId, name, {});
  if(!manager) {
    orgChart.children[employeeId] = employee;
  } else {
    manager.children[employeeId] = employee;
  }
}

/**
 * This function assign the employee to the new manager and removes the employee from old manager inside the organization chart.
 * @method moveEmployee
 * @param {String} employeeId
 * @param {String} newManagerId
 * @param {String} managerId
 */
function moveEmployee(employeeId, newManagerId) {
    let employee = findEmployee(orgChart, employeeId);
    removeNode(orgChart, employeeId);
    const manager = findEmployee(orgChart, newManagerId);
    manager.children[employeeId]= employee;
}

/** 
 * This function count the number of employee report up to a given employee inside the organization chart.
 * @method employeeCounter
 * @param {object} node
 * @param {arr} array of employees
 * @returns {Int} number of employees that report up to a given employee
 */
function employeeCounter(node, arr) {
  if(!node || !node.children) return arr;
  let employee = Object.keys(node.children);
  if(!employee) return arr;
  for(let e of employee) {
    arr.push(e);
    employeeCounter(node.children[e], arr);
  }
}

/**
 * Returns the number of employee under given employeeId
 * @param {String} employeeId
 * @returns {Int} number of employees that report up to a given employee
 */
function count(employeeId) {
    let employee = findEmployee(orgChart, employeeId);
    let arr = [];
    employeeCounter(employee, arr);
    return arr.length;
}

/** 
 * This function removes the given employee and all the employee under given employee from the organization chart.
 * @method removeEmployee
 * @param {object} node
 * @param {String} employeeId
 */
function removeEmployee(node, employeeId) {
  if(!node || !node.children) return;
  if(node.children[employeeId]) {
    delete node.children[employeeId];
    return;
  };
  let employee = Object.keys(node.children);
  if(!employee.length) return;
  for(let n of employee) {
    removeNode(node.children[n], employeeId);
  }
}

/**
 * @param {String} employeeId
 */
function remove(employeeId) {
    removeNode(orgChart, employeeId);
}

function printEmployee(employee) {
    if(!employee) return;
    if(!Object.keys(employee).length) return;
    for(let e of Object.keys(employee)) {
        console.log(`${employee[e].name} [${employee[e].employeeId}]`);
        if(Object.keys(employee[e].children).length) printEmployee(employee[e].children);
    }
}

function print() {
    let employee = orgChart.children;
    if(!Object.keys(employee).length) {
        console.log("No employee in org chart");
    } else {
        printEmployee(employee)
    }
};
