const expect = require('chai').expect;
const { gitMethods, GitMethods } = require('../../utils/git');

describe('Проверка git', () => {
    it('Функция parseHistoryItem работает правильно', () => {
      // Подготовка
      const stringValue = '04484b3e44fab6f89b502def768fa62bfbcd1b15	Yury Lavrukhin	2018-10-25 01:43:13 +0300	Add tests for navigation.js';
      const expectedResult = {
        hash: '04484b3e44fab6f89b502def768fa62bfbcd1b15',
        author: 'Yury Lavrukhin',
        timestamp: '2018-10-25 01:43:13 +0300',
        msg: 'Add tests for navigation.js'
      };

      // Действие
      const actualResult = gitMethods.parseHistoryItem(stringValue);

      // Проверка
      expect(actualResult).to.deep.equal(expectedResult);
    })

    it('Функция parseFileTreeItem работает правильно', () => {
      // Подготовка
      const stringValue = '040000 tree 4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5	views';
      const expectedResult = {
        type: 'tree',
        hash: '4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5',
        path: 'views'
      };

      // Действие
      const actualResult = gitMethods.parseFileTreeItem(stringValue);

      // Проверка
      expect(actualResult).to.deep.equal(expectedResult);
    })

    it('Функция gitHistory работает правильно', () => {
      // Подготовка
      const expectedResult = [ { hash: '04484b3e44fab6f89b502def768fa62bfbcd1b15',
        author: 'Yury Lavrukhin',
        timestamp: '2018-10-25 01:43:13 +0300',
        msg: 'Add tests for navigation.js' },
      { hash: '561e1cfb771ab23fb60a74aa54a9990b1d9ceee7',
        author: 'user',
        timestamp: '2018-10-23 15:05:51 +0300',
        msg:
        'Add dependencies: mocha, chai, hermione. Write basic config for hermione' },
      { hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:49:56 +0300',
        msg: 'исправлена опечатка в readme' },
      { hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:36:32 +0300',
        msg: 'readme' },
      { hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:10:05 +0300',
        msg: 'codestyle' },
      { hash: 'f2df8ac23e817f6da01624a77ec050a0147f642a',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:02:11 +0300',
        msg: 'стили' } ];

      const testGitMethods = new GitMethods();

      const fakeExecuteGitValue = `
04484b3e44fab6f89b502def768fa62bfbcd1b15	Yury Lavrukhin	2018-10-25 01:43:13 +0300	Add tests for navigation.js
561e1cfb771ab23fb60a74aa54a9990b1d9ceee7	user	2018-10-23 15:05:51 +0300	Add dependencies: mocha, chai, hermione. Write basic config for hermione
90180910fc27a11272a3e5caeeb119a51e5c0545	Dmitry Andriyanov	2018-10-16 12:49:56 +0300	исправлена опечатка в readme
cc2284293758e32c50fa952da2f487c8c5e8d023	Dmitry Andriyanov	2018-10-16 12:36:32 +0300	readme
7e013ae0440ad6e91082599376a6aaebe20d2112	Dmitry Andriyanov	2018-10-16 12:10:05 +0300	codestyle
f2df8ac23e817f6da01624a77ec050a0147f642a	Dmitry Andriyanov	2018-10-16 12:02:11 +0300	стили`;

      const fakeExecuteGit = () => {
        return new Promise((resolve, reject) => {
          resolve(fakeExecuteGitValue);
        })
      };

      testGitMethods.executeGit = fakeExecuteGit;

      // const executeGitStub = sinon.stub(testGitMethods, 'executeGit');

      // Действие
      const result = testGitMethods.gitHistory(1, 6);

      // expect(executeGitStub).to.be.calledWith() // Пытаюсь проверить аргументы, с которыми будет вызвана функция executeGit

      // Проверка
      result.then(data => {
        expect(data).to.deep.eql(expectedResult);
      })
    })
})