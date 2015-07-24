/*
contentMain {
	groups: [],
	collections: [],
	tasks: [],
}
function mapTemplate(contentMain) {
	for (var i = 0; i < groups.length; i ++) {
		var group = populateGroup(GroupElement.clone(), group[i]);
		displayGroup(group[0], group[1]);
	}
	var collectionYielder = CollectionElement.clone();
	for (var i = 0; i < collections.length; i ++) {
		var collectData = collectionFactory(contentMain.collections[i].collectionId, contentMain.collections[i].taskNames);
		var colCell = collectionYielder.clone();
		var collection = populateCollection(CollectionYielder.clone(), collectData)
		collectionYielder.set('position', {x: CollectionYielder.get('position').x, })
	}
	for (var i = 0; i < tasks.length; i ++) {
		var taskRect = taskFactory(tasks[i].taskId);
		taskRect.translate(i * (PADDING ,TASK_METRICS.height + PADDING)
		displayTask(taskRect);
	}
}

*/