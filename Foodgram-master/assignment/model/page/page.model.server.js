module.exports = function (mongoose, q) {

    var PageSchema = require('./page.schema.server')(mongoose);
    var PageModel = mongoose.model('PageModel', PageSchema);


    PageModel.createPage = createPage;
    PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
    PageModel.findPageById = findPageById;
    PageModel.updatePage = updatePage;
    PageModel.deletePage = deletePage;

    module.exports = PageModel;

    var api = {
        "createPage" : createPage,
        "findAllPagesForWebsite" : findAllPagesForWebsite,
        "findPageById" : findPageById,
        "updatePage" : updatePage,
        "deletePage" : deletePage,
        "addWidget" : addWidget
    };
    return api;

    function createPage(websiteId, page){
        var deferred = q.defer();
        page._website = websiteId;
        PageModel.create(page, function (err, doc) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        PageModel.find({_website: websiteId}, function (err, pages) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(pages);
            }
        });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        PageModel.findById(pageId, function (err, page) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        PageModel.update({_id:pageId},
            {$set:page}
            , function (err, page) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        PageModel.findByIdAndRemove({_id: pageId}, function (err, page) {
            if(err){
                deferred.reject(err);
            }
            else {
                page.remove();
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function addWidget(pageId, widgetId) {
        var deferred = q.defer();
        PageModel.findById(pageId, function (err, page) {
            if(err){
                deferred.reject(err);
            }
            else {
                page.widgets.push(widgetId);
                page.save();
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

};