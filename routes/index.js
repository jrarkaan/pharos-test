app.use('/api/dashboard', dashboardRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/live', liveRouter);
app.use('/api/header', headerRouter);
app.use('/api/footer', footerRouter);
app.use('/api/body', bodyRouter);
app.use('/api/request',requestRouter);
app.use('/api/auth',authRouter);
app.use('/api/recorded',recordedRouter);
app.use('/api/variable',variableRouter);
app.use('/api/sample', sampleRouter);
app.use('/api/test', testRouter);
app.use('/api/broadcaster', broadcasterRouter);
app.use('/api/file', fileRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/video', videoRouter);
app.use('/api/track', trackRouter);
app.use('/api/referral/dashboard', dashbaordReferralRouter);
app.use('/api/form/validation', formValidation);
app.use('/api/form/feedback', formFeedback);
// under development - pic raka
app.use('/api/link', linkRouter);
// @updated development guru api for zoom has started from V2
app.use('/api/v2/zoom', zoomRouter);

module.exports = app;