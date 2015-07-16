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

var GROUP_METRICS = {
  x: 200,
  y: 60,
  widthMin: (COLLECTION_METRICS.widthMin + 2 * PADDING),
  widthMax: (COLLECTION_METRICS.widthMax * 2 + 3 * PADDING),
  height: 30
};

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#myholder'),
    width: 600,
    height: 600,
    model: graph,
    gridSize: 1
});


/*
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
function changeText(textObj, text) {
  textObj.get('attrs').text.text = text;
}

function populateCollection(collection, data) {
  data.title.translate(collection.get('position').x + 2.5 * PADDING,
                       collection.get('position').y + PADDING);
  var lowerEnd = 0;
  for (var i = 0; i < data.tasks.length; i ++) {
    data.tasks[i].translate(collection.get('position').x + PADDING,
                            data.title.get('position').y + 2 * PADDING);
    data.tasks[i].translate(0, i * (TASK_METRICS.height * 1.15));
    //console.log(temptaskRect.get('position').y, i);
    lowerEnd = data.tasks[i].getBBox().corner().y;
    console.log(lowerEnd);
  }
  collection.set('size', {width: (TASK_METRICS.width + 2 * PADDING),
                         height: (lowerEnd - collection.get('position').y + PADDING)})
  collection.embed(data.title);      
  data.tasks.map( function(task) {
    collection.embed(task);
  });
}

function displayCollection(collection, data) {
  graph.addCells([collection].concat(data.title).concat(data.tasks));
}

var TITLE = new joint.shapes.basic.Text({
    position: {x: 0, y: 0},
    size: {width: 70, height:  20},
    attrs: {text: {text: '',
                   fill: 'black',
                   'font-size': 20,
                   'font-weight': 800,
                   'font-family': 'sans-serif',
                  }
           }
});

var Ctext = TITLE.clone();
changeText(Ctext, 'Collection');
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
        'stroke-width': 3
      },
      text: {
        text: 'task 1' 
      }
    }
});

var collectionTasks = [];
var lowerEnd = 0;
collectionTasks.unshift(taskRect);
for (var i = 0; i < 3; i ++) {
    var temptaskRect = collectionTasks[0].clone();
    collectionTasks.unshift(temptaskRect);
}
/*for (var i = 0; i < 3; i ++) {
    var temptaskRect = collectionTasks[0].clone();
    temptaskRect.translate(0, collectionTasks[0].get('size').height * 1.15);
    //console.log(temptaskRect.get('position').y, i);
    lowerEnd = temptaskRect.getBBox().corner().y;
    console.log(lowerEnd);
    collectionTasks.unshift(temptaskRect);
} */

var CollectionElement = new joint.shapes.basic.Rect({
    position: { 
      x: COLLECTION_METRICS.x,
      y: COLLECTION_METRICS.y 
    },
    size: { 
      width: (TASK_METRICS.width + 2 * PADDING), 
      height: (lowerEnd - COLLECTION_METRICS.y + PADDING)
    },
    attrs: { rect: { fill: 'blue' } }
});

var data = {
  title: Ctext,
  tasks: collectionTasks
}
populateCollection(CollectionElement, data);
displayCollection(CollectionElement, data);
CollectionElement.embed(Ctext);
collectionTasks.map( function(task) {
  CollectionElement.embed(collectionTasks[i]);
})

var groupCollections = [];


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
      fill: 'green'
    }
  }
});

var groupCollection = CollectionElement.clone();
var endingdimensions = {
  width: GROUP_METRICS.widthMin,
  height: GROUP_METRICS.height
}
groupCollection.translate(100 + PADDING, PADDING * 2);
var groupSize = {
  width: GROUP_METRICS.widthMin,
  height: GROUP_METRICS.height
}

for (var i = 0; i <= 2; i ++) {
  var tempCollection = groupCollection.clone();
  if (i % 2 == 1) {
    tempCollection.translate(COLLECTION_METRICS.widthMin + PADDING);
    groupSize.width = (tempCollection.getBBox().corner().x + PADDING) - GroupElement.get('position').x;
  } else if (i % 2 == 0) {
    if (i != 0) {
      tempCollection.translate(0, groupCollections[1].get('size').height + PADDING);
    }
    groupSize.height = tempCollection.getBBox().corner().y - GroupElement.get('position').y; 
  }
  groupCollections.unshift(tempCollection);
}

groupCollections.map( function(collection) {
  GroupElement.embed(collection)
})

GroupElement.set('size', groupSize);
graph.addCells([GroupElement]);
graph.addCells(groupCollections);