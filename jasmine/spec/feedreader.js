// eslint config:
/* global allFeeds, loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    const checkFeedProperty = prop => {
      for (const feed of allFeeds) {
        expect(feed[prop]).toBeDefined();
        expect(feed[prop]).toBeTruthy();
      }
    };

    /* a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have an URL defined', function() {
      checkFeedProperty('url');
    });


    /* a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have a name defined', function() {
      checkFeedProperty('name');
    });

  });


  describe('The menu', function() {
    // a test that ensures the menu element is hidden by default.
    it('is hidden by default', function() {
      // when the menu-hidden class is set on the <body>, the CSS rule '.menu-hidden .slide-menu' hides the menu
      expect($('body').hasClass('menu-hidden')).toBe(true);

    });

    /* a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * has two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when clicked', function() {
      const menuIcon = $('.menu-icon-link');
      menuIcon.trigger("click");
      expect($('body').hasClass('menu-hidden')).toBe(false);
      menuIcon.trigger("click");
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

  });

  describe('Initial Entries', function() {
    /* a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      if (allFeeds.length < 1) {
        done();
        return;
      }
      //
      loadFeed(0, () => {
        done();
      });
    });

    it('is not empty', function(done) {
      expect($('.feed .entry').length).toBeGreaterThan(0);
      done();
    });

  });

  describe('New Feed Selection', function() {
    /* a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * loadFeed() is asynchronous.
     */
    let textBefore;
    let textAfter;

    beforeEach(function(done) {
      if (allFeeds.length < 2) {
        done();
        return;
      }
      //
      loadFeed(0, () => {
        /* jQuery .text():
         * Get the combined text contents of each element in the set of matched elements, including their descendants,
         * or set the text contents of the matched element
         */
        textBefore = $('.feed').text();
        loadFeed(1, () => {
          textAfter = $('.feed').text();
          loadFeed(0, () => {
            done();
          });
        });
      });
    });

    it('changes the content', function(done) {
      const titles = [ textBefore, textAfter ];
      for (const title of titles) {
        expect(title).toBeDefined();
        expect(title).toBeTruthy();
      }
      expect(textBefore).not.toEqual(textAfter);
      done();
    });

  });

}());
