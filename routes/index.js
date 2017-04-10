var DBAuthHandler = require('./dbAuth');
var DBQBHandler = require('./dbQB');
var DBPortalHandler = require('./dbPortal');
var DBPortalManageHandler = require('./dbPortalManage');
var DBPortalUsersHandler = require('./dbPortalUsers');
var DBPlCommentsHandler = require('./dbPlComments');

module.exports = function(app, db){

    var dbAuthHandler = new DBAuthHandler(app, db);
    var dbQBHandler = new DBQBHandler(db);
    var dbPortalHandler = new DBPortalHandler(app, db);
    var dbPortalManageHandler = new DBPortalManageHandler(db);
    var dbPortalUsersHandler = new DBPortalUsersHandler(db);
    var dbPlCommentsHandler = new DBPlCommentsHandler(db);

    // auth
    app.post('/signup', dbAuthHandler.handleSignup);
    app.post('/login', dbAuthHandler.handleLogin);

    // app.get('/test', (req, res) => { res.send('fasf') });

    // qb
    app.post('/api/create_qb', dbQBHandler.createQB);
    app.get('/api/create_qb/get_categories', dbQBHandler.getCategories);

    // portal
    app.get('/api/user_params/:qb', dbQBHandler.getUserParams);
    app.get('/api/pl_themes/:qb', dbPortalHandler.getThemesList);
    app.get('/api/pl_theme/:themeID', dbPortalHandler.getTheme);
    app.get('/api/pl_themes_user_level/:qb', dbPortalHandler.getThemesUserLevel);

    // portal manage
    app.post('/api/pl_group_add/', dbPortalManageHandler.groupAdd);
    app.post('/api/pl_group_del/', dbPortalManageHandler.groupDel);
    app.post('/api/pl_theme_add/', dbPortalManageHandler.themeAdd);
    app.post('/api/pl_theme_del/', dbPortalManageHandler.themeDel);

    // portal users
    app.post('/api/pl_join_request/', dbPortalUsersHandler.joinRequest);
    app.get('/api/manage/:qb/memb_requests/:type', dbPortalUsersHandler.getMembRequests);
    app.post('/api/pl_join_request_accept/', dbPortalUsersHandler.acceptJoinRequest);
    app.post('/api/pl_join_request_reject/', dbPortalUsersHandler.rejectJoinRequest);
    app.get('/api/manage/:qb/members', dbPortalUsersHandler.getMembers);
    app.post('/api/manage/changeMemberLevel', dbPortalUsersHandler.changeMemberLevel);

    // portal comments
    app.get('/api/pl_theme_comments/:themeID', dbPlCommentsHandler.getComments);
    app.post('/api/pl_theme_comment_add/', dbPlCommentsHandler.commentAdd);
}
