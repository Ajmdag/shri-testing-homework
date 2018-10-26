const expect = require('chai').expect;
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('../../utils/navigation');

describe('Проверка buildBreadCrumbs', () => {
  it('Правильные хлебные крошки на странице index', () => {
    // Подготовка
    const expectedResult = [
      {
        text: 'HISTORY',
        href: undefined
      }
    ];

    // Действие
    const actualResult = buildBreadcrumbs();

    // Проверка
    expect(actualResult).to.deep.eql(expectedResult);
  });

  it('Правильные хлебные крошки на странице root', () => {
    // Подготовка
    const expectedResult = [
      {
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROOT',
        href: undefined
      }
    ];

    // Действие
    const actualResult = buildBreadcrumbs('hash5554432211');

    // Проверка
    expect(actualResult).to.deep.eql(expectedResult);
  });

  it('Правильные хлебные крошки на странице файла', () => {
    // Подготовка
    const expectedResult = [
      {
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROOT',
        href: '/files/hash5554432211/'
      },
      {
        text: 'path',
        href: '/files/hash5554432211/path/'
      },
      {
        text: 'To',
        href: '/files/hash5554432211/path/To/'
      },
      {
        text: 'File',
        href: '/files/hash5554432211/path/To/File/'
      },
      {
        text: 'file.js',
      }
    ];

    // Действие
    const actualResult = buildBreadcrumbs('hash5554432211', 'path/To/File/file.js');

    // Проверка
    expect(actualResult).to.deep.eql(expectedResult);
  });

  it('Правильные хлебные крошки на странице контента', () => {
    // Подготовка
    const expectedResult = [
      {
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROOT',
        href: '/files/anotherHash5554432211/'
      },
      {
        text: 'another',
        href: '/files/anotherHash5554432211/another/'
      },
      {
        text: 'Path',
        href: '/files/anotherHash5554432211/another/Path/'
      },
      {
        text: 'To',
        href: '/files/anotherHash5554432211/another/Path/To/'
      },
      {
        text: 'File'
      }
    ];

    // Действие
    const actualResult = buildBreadcrumbs('anotherHash5554432211', 'another/Path/To/File');

    // Проверка
    expect(actualResult).to.deep.eql(expectedResult);
  });
})

describe('Проверка функций, составляющих пути', () => {
  it('Функция buildFolderUrl работает правильно', () => {
    // Подготовка
    const expectedResult = '/files/32145901/path';

    // Действие
    const actualResult = buildFolderUrl(32145901, 'path');

    // Проверка
    expect(actualResult).to.be.eql(expectedResult);
  })

  it('Функция buildFileUrl работает правильно', () => {
    // Подготовка
    const expectedResult = '/content/amazingPath777/hellYesGoodPath';

    // Действие
    const actualResult = buildFileUrl('amazingPath777', 'hellYesGoodPath');

    // Проверка
    expect(actualResult).to.be.eql(expectedResult);
  })
})
