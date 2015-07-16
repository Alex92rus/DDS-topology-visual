/* topology input */
var PROPERTY = {
  prId: ''
};
function Property(propertyId) {
  this.prId = propertyId;
}
var EXE = {
  reachable: false,
  exeName: ''
};
function Exe(reachable, exeName) {
  this.reachable = reachable;
  this.exeName = exeName;
};
var env = {
  reachable: false,
  envName:''
};
function Env(reachable, envName) {
  this.reachable = reachable;
  this.envName = envName;
};
var TASK = {
  taskId: '',
  exe: null,
  env: null,
  properties: []
};
function Task(taskId, exe, env, properties) {
  this.taskId = taskId;
  this.exe = exe;
  this.env = env;
  this.properties = properties;
};
var COLLECTION = {
  collectionId: '',
  tasks: []
};
function Collection(collectionId, tasks) {
  this.collectionId = collectionId;
  this.tasks = tasks;
};

var properties = [];
for (var i = 1; i <= 4; i ++) {
  var property = new Property("property"+i);
  properties.push(property);
}

var tasks = [];
var exeOne = new Exe(true, 'app1 -l -n');
var envOne = new Env(false, 'env1');
var taskOneProperties = [properties[0]].concat(properties[3]).concat(properties[0]);
var taskOne = new Task('task1', exeOne, envOne, taskOneProperties);
tasks.push(taskOne);

var exeTwo = new Exe(false, 'app2');
var taskTwoProperties = [properties[0]].concat(properties[1])
var taskTwo = new Task('task2', exeTwo, undefined, taskTwoProperties);
tasks.push(taskTwo);

var exeThree = new Exe(true, 'app3');
var taskThreeProperties = [properties[1]].concat(properties[2]);
var taskThree = new Task('task3', exeThree, undefined, taskThreeProperties);
tasks.push(taskThree);

var exeFour = new Exe(false, 'app4');
var taskFourProperties = [properties[2]].concat(properties[3]);
var taskFour = new Task('task4', exeFour, undefined, taskFourProperties);
tasks.push(taskFour);

var exeFive = new Exe(false, 'app5');
var taskFiveProperties = [properties[0]];
var taskFive = new Task('task5', exeFive, undefined, taskFiveProperties);
tasks.push(taskFive);

var collections = [];
var collectionOneTasks = [tasks[0], tasks[1], tasks[1], tasks[2]];
var collectionOne = new Collection('collection1', collectionOneTasks);
collections.push(collectionOne);

var collectionTwoTasks = [tasks[3], tasks[3], tasks[4]];
var collectionTwo = new Collection('collection2', collectionTwoTasks);
collections.push(collectionTwo);


//----------------------------
var GROUP = {
  groupId: '',
  collections: [],
  tasks: [],
  multiplicity: 0
};
function Group(groupId, collections, tasks, multiplicity) {
  this.groupId = groupId;
  this.colllections = collections;
  this.tasks = tasks;
  this.multiplicity = multiplicity;
};

var groupOneTasks =  [tasks[0], tasks[0]];
var groupOneCollections = [collections[0], collections[1]];
var groupOneMultiplicity = 10;
var groupOne = new Group('group1', groupOneCollections, groupOneTasks, groupOneMultiplicity);

var groupTwoTasks =  [tasks[2], tasks[3]];
var groupTwoCollections = [collections[0], collections[1]];
var groupTwoMultiplicity = 10;
var groupTwo = new Group('group1', groupTwoCollections, groupTwoTasks, groupTwoMultiplicity);

var mockCollection = {
  name: "interpolations",
  taskNames: [
    "Bilinear interpolation",
    "Spline interpolation",
    "Polynomial interpolation",
    "de Casteljau's algorithm"
  ]
}

/* Graphical representation: Constants and objects */
var PADDING = 10;
var TASK_METRICS = {
  width: 100,
  height: 30
};

var COLLECTION_METRICS = {
  x: 100,
  y: 60,
  widthMin: (TASK_METRICS.width + 2 * PADDING),
  widthMax: (TASK_METRICS.width * 2 + 3 * PADDING)
};

var TransparentContainer = new joint.shapes.basic.Rect({
    position: { 
      x: 0,
      y: 0 
    },

    attrs: { rect: { 
        fill: {
          color:'blue',
          opacity: 1
        },
        'stroke-width': 0
      } 
    }
});

var MultiplicityContainer = new joint.shapes.basic.Rect({
    position: { 
      x: 0,
      y: 0 
    },
    size: { 
      width: 30, 
      height: TASK_METRICS.height
    },
    attrs: { rect: { 
        fill: '#FFFF00',
        'stroke-width': 3,
        'text': 'multBox'
        },
        text: {
          'font-weight': 800
        }
      } 
});
MultiplicityContainer.prop('draggable', 'OFF');

var CollectionElement = new joint.shapes.basic.Rect({
    position: { 
      x: 0,
      y: 0 
    },
    size: { 
      width: 0, 
      height: 0
    },
    attrs: { 
      rect: { 
        fill: '#AAAAAA',
        rx: 5, 
        ry: 5,
    } 
   }
}); 

var GROUP_METRICS = {
  x: 200,
  y: 60,
  widthMin: (COLLECTION_METRICS.widthMin + 2 * PADDING),
  widthMax: (COLLECTION_METRICS.widthMin * 2 + 3 * PADDING),
  height: 30
};

var taskRect = new joint.shapes.basic.Rect({
    position: {
      x: 0, //(COLLECTION_METRICS.x + PADDING),
      y: 0 //Ctext.get('position').y + 20
    },
    size: {
      width: TASK_METRICS.width,
      height: TASK_METRICS.height
    },
    attrs: {
      rect: {
        fill: 'white',
        rx: 5, 
        ry: 5,
        'stroke-width': 3
      },
      text: {
        text: 'task 1' 
      }
    }
});

var TITLE = new joint.shapes.basic.Text({
    position: {x: 0, y: 0},
    size: {width: 70, height:  20},
    attrs: {text: {
        text: '',
        fill: 'black',
        'class': 'masterTooltip',
        'font-size': 20,
        'font-weight': 800,
        'font-family': 'sans-serif'
      }
    }
});
TITLE.prop('draggable', 'OFF');
var mockProperties = ["3sec CPU time","100MB of RAM", "3GB Disk Space", "RMS to single", "RMS to printer"];

/* Utility functions
collection requires the number of tasks to know its height*
group requires collections and tasks to know height
collectioninput = {
  tasks: []
}
groupinput = {
  collections: [],
  freeTasks: []
}
collections have to be calculated before the group
JOL for svg plot:
SVGinput = {
  groups: [],
  collections: [],
  tasks: []
}
*/

/* creates @number task rectangle objects */
function tasksFactory(number) {
  var tasks = [];
  for (var i = 0; i < number; i ++) {
      var temptaskRect = taskRect.clone();
      temptaskRect.attr('text/class', 'masterTooltip');
      temptaskRect.attr('text/title', 'Task');
      tasks.unshift(temptaskRect);
  }
  return tasks;
}

/* creates a single task given a @name */
function taskFactory(name) {
  var temptaskRect = taskRect.clone();
  temptaskRect.attr('text/class', 'masterTooltip');
  temptaskRect.attr('text/title', name);
  changeText(temptaskRect, name.substring(0, 10));
  return temptaskRect;
}

function collectionFactory(collectionName, taskNames) {
  var data = {title: TITLE.clone(), tasks: []};
  changeText(data.title, collectionName);
  var tasks = [];
  for (var i = 0; i < taskNames.length; i ++) {
    tasks.push(taskFactory(taskNames[i]));
  }
  data.tasks = tasks;
  return $.extend(true, {}, data);
}

/* sets the text in  @textObject with @text */
function changeText(textObj, text) {
  textObj.get('attrs').text.text = text; // should be with set, property 2 levels down 
}

/* populates @collection with tasks and title in @data object */
function populateCollection(collection, data, titless) {
  var initialX = collection.get('position').x + PADDING;
  var initialY = 0;
  if (titless !== undefined) {
    if (titless === true) {
      initialY = collection.get('position').y + PADDING;
    }
  } else {
    data.title.translate(collection.get('position').x + 2.5 * PADDING,
                       collection.get('position').y + PADDING);
    initialY = data.title.get('position').y + 2 * PADDING;
  }
  var lowerEnd = 0;
  for (var i = 0; i < data.tasks.length; i ++) {
    data.tasks[i].translate(initialX, initialY);
    data.tasks[i].translate(0, i * (TASK_METRICS.height * 1.15));
    lowerEnd = data.tasks[i].getBBox().corner().y;
  }
  collection.set('size', {width: (TASK_METRICS.width + 2 * PADDING),
                         height: (lowerEnd - collection.get('position').y + PADDING)})
  collection.embed(data.title);      
  data.tasks.map( function(task) {
    collection.embed(task);
  });
}

/* displays @collection */
function displayCollection(collection, data) {
  graph.addCells([collection].concat(data.title).concat(data.tasks));
}

/*
data {
  groupId: String
  collections: collectionData[], 
  tasks: tasks[]
  multiplicity : unsigned int
}
 populates @group with tasks, collections and multiplicity @data 
return: structure for display
*/
function populateGroup(groupBox, infoGroup) {
  var lowerEndRight = 0;
  var lowerEndLeft = 0;
  var groupIdBox = TITLE.clone();
  changeText(groupIdBox, 'Group');
  groupIdBox.translate(groupBox.get('position').x + 2.5 * PADDING,
                       groupBox.get('position').y + PADDING);
  var collectionSet = [];
  lowerEndLeft = groupIdBox.getBBox().corner().y;
  lowerEndRight = lowerEndLeft;
  if (infoGroup.collections.length > 1) {
    groupBox.set('size', {
      width: GROUP_METRICS.widthMax,
      height: GROUP_METRICS.height
    });
  }
  var rightTranslation = groupBox.get('position').x + COLLECTION_METRICS.widthMin + 2 * PADDING;
  var leftTranslation = groupBox.get('position').x + PADDING;
  for (var i = 0; i < infoGroup.collections.length; i ++) {
    /* TO DO: situate these collections better. Edge case : small collections
     from the left and large on the right */
    var tempCollection = CollectionElement.clone();
    if (lowerEndLeft <= lowerEndRight) {
      tempCollection.translate(leftTranslation,
                               lowerEndLeft + PADDING);
      populateCollection(tempCollection, infoGroup.collections[i]);
      lowerEndLeft = tempCollection.getBBox().corner().y;
    } else  {
      tempCollection.translate(rightTranslation,
                               lowerEndRight + PADDING);
      populateCollection(tempCollection, infoGroup.collections[i]);
      lowerEndRight = tempCollection.getBBox().corner().y;
    }
    collectionSet.unshift({collection: tempCollection, tasks: infoGroup.collections[i]});
  }
  var freeTasksCollection = TransparentContainer.clone();
  var empty = TITLE.clone();
  var freeTasksData = {title: empty, tasks: infoGroup.tasks};
  if (lowerEndLeft <= lowerEndRight) {
    freeTasksCollection.translate(leftTranslation, lowerEndLeft + PADDING);
    populateCollection(freeTasksCollection, freeTasksData, true);
    lowerEndLeft = freeTasksCollection.getBBox().corner().y;
  } else {
    freeTasksCollection.translate(rightTranslation, lowerEndRight + PADDING);
    populateCollection(freeTasksCollection, freeTasksData, true);
    lowerEndRight = freeTasksCollection.getBBox().corner().y;
  }
  collectionSet.push({collection: freeTasksCollection, tasks: freeTasksData});
  var groupHeight = (lowerEndRight < lowerEndLeft ? lowerEndLeft : lowerEndRight) -
                    groupBox.get('position').y + PADDING;
  groupBox.set('size', {
    width: groupBox.get('size').width,
    height: groupHeight 
  });
  var multiplicityContainer = MultiplicityContainer.clone();
  multiplicityContainer.attr('text/text', infoGroup.multiplicity);
  multiplicityContainer.translate(groupBox.getBBox().topRight().x
    -(multiplicityContainer.get('size').width + PADDING), groupBox.getBBox().topRight().y);
  groupBox.embed(groupIdBox);
  groupBox.embed(multiplicityContainer);
  collectionSet.map( function (collection) {
    groupBox.embed(collection.collection);
  });
  return [{plot:groupBox, title: groupIdBox, numberBox: multiplicityContainer}].concat([{data: collectionSet}]);
}

/*  displays  @group and the @data embedded in it */
function displayGroup(group, data) {
  graph.addCells([group.plot]);
  graph.addCells([group.title]);
  data.data.map(function(element) {
    displayCollection(element.collection, element.tasks)
  });
  graph.addCells([group.numberBox])
}

/* Plotting starts here */
var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#myholder'),
    width: 600,
    height: 500,
    model: graph,
    gridSize: 1
});

/* event handlers */
graph.on('all', function(eventName, cell) {
      console.log(arguments);
});

paper.on('cell:mouseover', function(cellView) {
  if (cellView.model instanceof joint.dia.Element) {
    if (cellView.model.prop('draggable') == 'OFF') {
        console.log('here');
        cellView.model.attr('rect/style/pointer-events', 'none');
        cellView.model.attr('text/style/pointer-events', 'none');
        return;
    }
  }  
});

paper.on('cell:mouseout', function(cellView) {
  if (cellView.model instanceof joint.dia.Element) {
    if (cellView.model.prop('draggable') == 'OFF') {
        console.log('out');
        cellView.model.attr('rect/style/pointer-events', 'none');
        cellView.model.attr('text/style/pointer-events', 'none');
        return;
    }
  }
});

graph.on('change:position', function(cell) {

    var parentId = cell.get('parent');
    if (!parentId) return;

    var parent = graph.getCell(parentId);
    var parentBbox = parent.getBBox();
    var cellBbox = cell.getBBox();

    if (parentBbox.containsPoint(cellBbox.origin()) &&
        parentBbox.containsPoint(cellBbox.topRight()) &&
        parentBbox.containsPoint(cellBbox.corner()) &&
        parentBbox.containsPoint(cellBbox.bottomLeft())) {

        // All the four corners of the child are inside
        // the parent area.
        return;
    }

    // Revert the child position.
    cell.set('position', cell.previous('position'));
});

//------------------------------------------
/* making  a collection */
var collectData = collectionFactory(mockCollection.name, mockCollection.taskNames);
var colCell = CollectionElement.clone();
populateCollection(colCell, collectData);
console.log(collectData);
displayCollection(colCell, collectData);

/* making  a group */
var GroupElement = new joint.shapes.basic.Rect({
  position: { 
    x: GROUP_METRICS.x,
    y: GROUP_METRICS.y
  },
  size: { 
    width: GROUP_METRICS.widthMin,
    height: GROUP_METRICS.height
  },
  attrs: { 
    rect: { 
      fill: '#FF7F00',
      rx: 2, 
      ry: 2 
    } 
  }
});

var groupCollections = [];
for (var i = 0; i <= 2; i ++) {
  var tempCollection = {
    title: TITLE.clone(),
    tasks: []
  };
  changeText(tempCollection.title, 'Collection');
  var collectionTasks = [];
  var tasksNo = Math.random() * 6;
  for (var j = 0; j <= tasksNo; j ++) {
    collectionTasks.push(taskFactory(mockCollection.taskNames[Math.floor(Math.random() * 4)]));
  }
  tempCollection.tasks = collectionTasks;
  groupCollections.push(tempCollection);
}

var Gtext = TITLE.clone();
console.log(groupCollections.length);
changeText(Gtext, 'Group');

var groupTasks = [];
for (var j = 0; j <= 1; j ++) {
  groupTasks.push(taskFactory(mockCollection.taskNames[Math.floor(Math.random() * 4)]));
}

var groupData = {
  title: Gtext,
  collections: groupCollections,
  tasks: groupTasks,
  multiplicity: 20
}

var group = populateGroup(GroupElement.clone(), groupData);
displayGroup(group[0], group[1]);

var link = new joint.dia.Link({
  source: { id: group[1].data[2].tasks.tasks[0].id },
  target: { id: collectData.tasks[1].id }
});

link.attr({
    '.connection': { stroke: 'blue', 'stroke-width': 4},
    '.marker-source': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' },
    '.marker-target': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' }
});

graph.addCells([link]);

var nodesGraph = new joint.dia.Graph;

var nodesPaper = new joint.dia.Paper({
    el: $('#tasksGraph'),
    width: 600,
    height: 600,
    model: nodesGraph,
    gridSize: 1
});

var visTasks = tasks.map( function(task) {
  var rectBox = taskFactory(task.taskId);
  return {rectBox: rectBox, task:task};
})

var propLinks = [];
for (var i = 0; i < visTasks.length; i ++) {
  visTasks[i].rectBox.translate((6 * PADDING) * ((i % 3) + 1) + (i % 3) * TASK_METRICS.width,
                                (10 * PADDING)* Math.floor(1 + (i / 3)));
  for (var j = 0; j < visTasks[i].task.properties.length; j++) {
     for (var k = i + 1; k < visTasks.length; k ++) {
        if (_.contains(visTasks[k].task.properties, visTasks[i].task.properties[j])) {
          var propLink = new joint.dia.Link({
            source: { id: visTasks[i].rectBox.id },
            target: { id: visTasks[k].rectBox.id },
            connector: {name: 'rounded'}
          });
          propLink.attr({
              '.connection-wrap': {
                'title': visTasks[i].task.properties[j].prId
              },
              '.connection': { 
                stroke: 'blue',
                'stroke-width': 4
              },
              '.marker-source': { 
                fill: 'yellow',
                d: 'M 10 0 L 0 5 L 10 10 z'
              },
              '.marker-target': {
                fill: 'yellow',
                d: 'M 10 0 L 0 5 L 10 10 z'
              }
          });
          propLinks.push(propLink);
        }
     }
  }
}

nodesGraph.addCells(visTasks.map(function (vistask) {
  return vistask.rectBox;
}));
nodesGraph.addCells(propLinks);
