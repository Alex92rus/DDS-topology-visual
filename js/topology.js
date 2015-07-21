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

propertyIds =  [ 
  "DataPublisherOutputAddress",
  "FLPSenderInputAddress",
  "FLPSenderHeartbeatInputAddress",
  "EPNReceiverInputAddress",
  "EPNReceiverOutputAddress",
  "TrackingOutputAddress",
  "CollectorInputAddress"
];

for (var i = 0; i < propertyIds.length; i ++) {
  var property = new Property(propertyIds[i]);
  properties.push(property);
};
/*for (var i = 1; i <= 4; i ++) {
  var property = new Property("property"+i);
  properties.push(property);
}*/

var tasks = [];

        
var exeOne = new Exe(true, '$ALICEO2_INSTALL_DIR/bin/aliceHLTW');
var taskOneProperties = [{
  access: 'write',
  property: properties[0]
}];
var taskOne = new Task('dataPublisher', exeOne, undefined, taskOneProperties);
tasks.push(taskOne);

var exeTwo = new Exe(true, '$ALICEO2_INSTALL_DIR/bin/aliceHLTWrapper Relay');
var taskTwoProperties = [{
  access: 'read',
  property: properties[0]
}, {
  access: 'read',
  property: properties[1]
}];
var taskTwo = new Task('relay', exeTwo, undefined, taskTwoProperties);
tasks.push(taskTwo);

var exeThree = new Exe(true, '$ALICEO2_INSTALL_DIR/bin/flpSender_dds');
var taskThreeProperties = [{
  access: 'write',
  property: properties[1]
}, {
  access: 'write',
  property: properties[2]
}, {
  access: 'read',
  property: properties[3]
}];
var taskThree = new Task('flpSender', exeThree, undefined, taskThreeProperties);
tasks.push(taskThree);

var exeFour = new Exe(true, '$ALICEO2_INSTALL_DIR/bin/epnReceiver_dds');
var taskFourProperties = [{
  access: 'read',
  property: properties[2]
}, {
  access: 'write',
  property: properties[3]
}, {
  access: 'write',
  property: properties[4]
}];
var taskFour = new Task('epnReciever', exeFour, undefined, taskFourProperties);
tasks.push(taskFour);

var exeFive = new Exe(true, '$ALICEO2_INSTALL_DIR/bin/aliceHLTWrapper Tracker');
var taskFiveProperties = [{
  access: 'read',
  property: properties[4]
}, {
  access: 'write',
  property: properties[5]
}];
var taskFive = new Task('tracker', exeFive, undefined, taskFiveProperties);
tasks.push(taskFive);

var exeSix = new Exe(true, '$ALICEO2_INSTALL_DIR/bin/aliceHLTWrapper GlobalMerge');
var taskSixProperties = [{
  access: 'read',
  property: properties[5]
}, {
  access: 'read',
  property: properties[6]
}];
var taskSix = new Task('merger', exeSix, undefined, taskSixProperties);
tasks.push(taskSix);

var exeSeven = new Exe(true, '$ALICEO2_INSTALL_DIR/bin/aliceHLTWrapper Collector 1');
var taskSevenProperties = [{
  access: 'write',
  property: properties[6]
}];
var taskSeven = new Task('collector', exeSeven, undefined, taskSevenProperties);
tasks.push(taskSeven);

var mainTasks = [tasks[6]];

var collections = [];
var collectionOneTasks = [tasks[0], tasks[1], tasks[2]];
var collectionOne = new Collection('flpcollection', collectionOneTasks);
collections.push(collectionOne);

var collectionTwoTasks = [tasks[3], tasks[4], tasks[5]];
var collectionTwo = new Collection('epncollection', collectionTwoTasks);
collections.push(collectionTwo);
var mainCollections = [];

/*
-- OLDTESTDATA----
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
var mainTasks = [tasks[0], tasks[0]];

var collections = [];
var collectionOneTasks = [tasks[0], tasks[1], tasks[1], tasks[2]];
var collectionOne = new Collection('collection1', collectionOneTasks);
collections.push(collectionOne);

var collectionTwoTasks = [tasks[3], tasks[3], tasks[4]];
var collectionTwo = new Collection('collection2', collectionTwoTasks);
collections.push(collectionTwo);
var mainCollections = [collections[0], collections[0]];

var groupOneTasks = [tasks[0], tasks[0]];
var groupOneCollections = [collections[0], collections[1]];
var groupOneMultiplicity = 10;
var groupOne = new Group('group1', groupOneCollections, groupOneTasks, groupOneMultiplicity);
mainGroups.push(groupOne);

var groupTwoTasks = [tasks[2], tasks[3]];
var groupTwoCollections = [collections[0], collections[1]];
var groupTwoMultiplicity = 15;
var groupTwo = new Group('group2', groupTwoCollections, groupTwoTasks, groupTwoMultiplicity);
mainGroups.push(groupTwo);
*/
var GROUP = {
  groupId: '',
  collections: [],
  tasks: [],
  multiplicity: 0
};
function Group(groupId, collections, tasks, multiplicity) {
  this.groupId = groupId;
  this.collections = collections;
  this.tasks = tasks;
  this.multiplicity = multiplicity;
};

var mainGroups = [];
var groupOneTasks = [];
var groupOneCollections = [collections[0]];
var groupOneMultiplicity = 2;
var groupOne = new Group('groupFLP', groupOneCollections, groupOneTasks, groupOneMultiplicity);
mainGroups.push(groupOne);

var groupTwoTasks = [];
var groupTwoCollections = [collections[1]];
var groupTwoMultiplicity = 4;
var groupTwo = new Group('groupEPN', groupTwoCollections, groupTwoTasks, groupTwoMultiplicity);
mainGroups.push(groupTwo);




/*



*/
var mainPlot = {
  tasks: mainTasks,
  collections: mainCollections,
  groups: mainGroups
} 

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
  x: PADDING,
  y: 60,
  width: 100,
  height: 30
};

var COLLECTION_METRICS = {
  x: 460,
  y: 60,
  widthMin: (TASK_METRICS.width + 2 * PADDING), // 120
  widthMax: (TASK_METRICS.width * 2 + 3 * PADDING) // 230
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
  x: 160,
  y: 6 * PADDING,
  widthMin: (COLLECTION_METRICS.widthMin + 2 * PADDING), // 140
  widthMax: (COLLECTION_METRICS.widthMin * 2 + 3 * PADDING), // 270
  height: 30
};

//----------------------
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


/*acts as a saver of all links and elements in the graph*/
var GRAPH_MIDDLEMAN = {
  jointElements: [],
  jointLinks: []
};
function GraphMiddleman(jointElements, jointLinks) {
  this.jointElements = jointElements;
  this.jointLinks = jointLinks;
}
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

function displayTask(task) {
  graph.addCells([task]);
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
  data.tasks.forEach( function (task, i) {
    task.translate(initialX, initialY);
    task.translate(0, i * (TASK_METRICS.height * 1.60));
    lowerEnd = task.getBBox().corner().y;
  })
  collection.set('size', {
    width: (TASK_METRICS.width + 2 * PADDING),
    height: (lowerEnd - collection.get('position').y + PADDING)
  });
  collection.embed(data.title);   
  data.tasks.map( function(task) {
    collection.embed(task);
  });
  return collection;
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
  changeText(groupIdBox, infoGroup.groupId);
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
      tempCollection.translate(leftTranslation, lowerEndLeft + PADDING);
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
  GroupElement.set('position', {x: GROUP_METRICS.x + PADDING, y: groupBox.getBBox().corner().y})
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


function displayPropertyLinks(property, graph, jointJsMiddleman) {
  var propLinks = getLinksWithProperty(graph, jointJsMiddleman, property);
  graph.addCells(propLinks);
}

function mapTemplate(contentMain) {
  var collectionYielder = CollectionElement.clone();
  collectionYielder.set('position', {
    x: COLLECTION_METRICS.x,
    y: COLLECTION_METRICS.y
  });
  for (var i = 0; i < contentMain.collections.length; i ++) {
    console.log(extractProperties(contentMain.collections[i].tasks, 'taskId'));
    var collectData = collectionFactory(contentMain.collections[i].collectionId,
      extractProperties(contentMain.collections[i].tasks, 'taskId'));
    collectData.tasks.forEach (function (task, j) {
      task.prop('properties', contentMain.collections[i].tasks[j].properties);
      console.log(task.prop('properties'));
    });
    var colCell = collectionYielder.clone();
    var collection = populateCollection(colCell, collectData);
    collectionYielder.set('position', {
      x: collectionYielder.get('position').x,
      y: collection.getBBox().corner().y + PADDING
    })

    displayCollection(collection, collectData);
  }
  var GroupYielder = GroupElement.clone();
  for (var i = 0; i < contentMain.groups.length; i ++) {
    var groupCollections = contentMain.groups[i].collections.map( function (collection) {
      return collectionFactory(collection.collectionId,
          extractProperties(collection.tasks, 'taskId'));
    });
    var groupTasks = extractProperties(contentMain.groups[i].tasks, 'taskId').map(function (taskId) {
      return taskFactory(taskId);
    });
    groupCollections.forEach( function(collection, m) {
      collection.tasks.forEach ( function(task, k) {
        task.prop('properties', contentMain.groups[i].collections[m].tasks[k].properties);
      })
    });
    groupTasks.forEach (function (task, j) {
      task.prop('properties', contentMain.groups[i].tasks[j].properties);
      console.log(task.prop('properties'));
    });
    var tObject = {
      collections: groupCollections,
      groupId: contentMain.groups[i].groupId,
      multiplicity: contentMain.groups[i].multiplicity,
      tasks: groupTasks
    }
    var group = populateGroup(GroupYielder.clone(), tObject);
    GroupYielder.set('position', {
      x: GROUP_METRICS.x,
      y: (group[0].plot.getBBox().corner().y + PADDING)
    });
    displayGroup(group[0], group[1]);
  }
  for (var i = 0; i < contentMain.tasks.length; i ++) {
    var mainTask = taskFactory(contentMain.tasks[i].taskId);
    mainTask.translate(TASK_METRICS.x, TASK_METRICS.y);
    mainTask.translate(0, i * (TASK_METRICS.height + PADDING));
    mainTask.prop('properties', contentMain.tasks[i].properties);
    displayTask(mainTask);
  }
}

function mapLinks() {
  var plotLinks = [];
  var plotTasks = sieveByProperty(graph.getElements(), 'properties');
  for (var i = 0; i < plotTasks.length; i ++) {
    for (var j = i + 1; j < plotTasks.length; j ++) {
      if (plotTasks[i].get('attrs').text.text != plotTasks[j].get('attrs').text.text) {
        plotTasks[i].prop('properties').forEach (function (_property) {
          var propAttrs = extractProperties(plotTasks[j].prop('properties'), 'property');
          if (_.indexOf(extractProperties(propAttrs, 'prId'), _property.property.prId) > -1) {
            var source,
                target;
            if (_property.access === 'write') {
              source = plotTasks[i];
              target = plotTasks[j];
            } else {
              source = plotTasks[j];
              target = plotTasks[i];
            }
            var link = new joint.dia.Link({
              source: { id: source.id },
              target: { id: target.id }
            });
            link.attr({
              '.connection-wrap': {
                'title': _property.property.prId
              },
              '.connection': { 
                stroke: 'blue',
                'stroke-width': 4
              },
              '.marker-target': {
                fill: 'yellow',
                d: 'M 10 0 L 0 5 L 10 10 z'
              }
            });
              plotLinks.push(link);
          }
        });
      }
    }
  }
  return plotLinks;
}

function setPropertyList(properties, graph, jointJsMiddleman) {
  var sel = document.getElementById('PropertyList');
  sel.setAttribute('onChange', displayPropertyLinks("property1", graph, jointJsMiddleman));    displayPropertyLinks
  var fragment = document.createDocumentFragment();
  properties.forEach(function(property) {
      var opt = document.createElement('option');
      opt.innerHTML = property.prId;
      opt.value = property.prId;
      fragment.appendChild(opt);
  });
  sel.appendChild(fragment);
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
      //console.log(arguments);
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
    // the parent area
    return;
  }

  // Revert the child position.
  cell.set('position', cell.previous('position'));
});

//------------------------------------------
/* making  a collection */
var collectData = collectionFactory(mockCollection.name, mockCollection.taskNames);
var colCell = CollectionElement.clone();
colCell.set('position', {x: 460, y: 60})
//populateCollection(colCell, collectData);
console.log(collectData);
//displayCollection(colCell, collectData);

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


var groupTasks = [];
for (var j = 0; j <= 1; j ++) {
  groupTasks.push(taskFactory(mockCollection.taskNames[Math.floor(Math.random() * 4)]));
}

var groupData = {
  groupId: 'Group',
  collections: groupCollections,
  tasks: groupTasks,
  multiplicity: 20
}

//var group = populateGroup(GroupElement.clone(), groupData);
//displayGroup(group[0], group[1]);

mapTemplate(mainPlot);
graph.addCells(mapLinks());
var graphMiddleman = new GraphMiddleman(graph.getElements(), graph.getLinks());
//setPropertyList(properties, graph, graphMiddleman);
/*var link = new joint.dida.Link({
  source: { id: group[1].data[1].tasks.tasks[0].id },
  target: { id: collectData.tasks[1].id }
});

link.attr({
  '.connection': { stroke: 'blue', 'stroke-width': 4},
  '.marker-source': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' },
  '.marker-target': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' }
});

graph.addCells([link]);
*/
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
