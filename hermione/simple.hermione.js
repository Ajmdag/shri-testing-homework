var assert = require('chai').assert;

describe('git history viewer', function() {

    const testHashValue = '1723172017dceeb3bc3559b5ff460acc8d7b637b';
    it('Переход из списка коммитов на список файлов коммита 1723172017dceeb3bc3559b5ff460acc8d7b637b переходит на `http://localhost:3000/files/1723172017dceeb3bc3559b5ff460acc8d7b637b/`', function() {
        return this.browser
            .url('http://localhost:3000')
            .element('.commit__link')
            .click(`a=${testHashValue}`)
            .getUrl()
            .then(function(list) {
                assert.equal(list, [`http://localhost:3000/files/${testHashValue}/`])
            });
    });

    it('Переход из списка файлов во вложенную папку views переходит на `http://localhost:3000/files/1723172017dceeb3bc3559b5ff460acc8d7b637b/views`', function() {
        return this.browser
            .url(`http://localhost:3000/files/${testHashValue}/`)
            .click(`a=views`)
            .getUrl()
            .then(function(list) {
                assert.equal(list, [`http://localhost:3000/files/${testHashValue}/views`])
            });
    });

    it('Переход из списка файлов на страницу отдельного файла переходит на `http://localhost:3000/content/1723172017dceeb3bc3559b5ff460acc8d7b637b/app.js`', function() {
        return this.browser
            .url(`http://localhost:3000/files/${testHashValue}/`)
            .click(`a=app.js`)
            .getUrl()
            .then(function(list) {
                assert.equal(list, [`http://localhost:3000/content/${testHashValue}/app.js`])
            });
    });

    it('Переход из страницы отдельного файла на HISTORY переходит на http://localhost:3000/', function() {
        return this.browser
            .url(`http://localhost:3000/content/${testHashValue}/app.js`)
            .elements('.breadcrumbs')
            .click(`a=HISTORY`)
            .getUrl()
            .then(function(list) {
                assert.equal(list, [`http://localhost:3000/`])
            });
    });

    it('Переход из страницы отдельного файла на ROOT переходит на `http://localhost:3000/files/1723172017dceeb3bc3559b5ff460acc8d7b637b/`', function() {
        return this.browser
            .url(`http://localhost:3000/content/${testHashValue}/app.js`)
            .elements('.breadcrumbs')
            .click(`a=ROOT`)
            .getUrl()
            .then(function(list) {
                assert.equal(list, [`http://localhost:3000/files/${testHashValue}/`])
            });
    });

    it('На главной странице отображается 20 коммитов', function() {
        return this.browser
            .url(`http://localhost:3000/`)
            .elements('.commit')
            .then(function(data) {
                assert.equal(data.value.length, 20)
            });
    });
});
