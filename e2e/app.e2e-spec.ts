import { IdeiaUiPage } from './app.po';

describe('ideia-ui App', () => {
  let page: IdeiaUiPage;

  beforeEach(() => {
    page = new IdeiaUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
