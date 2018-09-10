describe('Angular Predictive Analysis -', () => {
  browser.get('https://employee-attrition-prediction.firebaseapp.com/');
  browser.ignoreSynchronization = true;
  describe('Home Page', () => {
    it('should have default date selection as currect date', () => {
      // Arrange
      const predictionDateSelector = element(by.css('.md-datepicker-input-container input'));
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1; // January is 0!
      const yyyy = today.getFullYear();
      const todaysDateString = `${mm}/${dd}/${yyyy}`;
      // Assert
      expect(predictionDateSelector.getAttribute('value')).toEqual(todaysDateString);
    });
    it('should have default Prediction period as 6 months', () => {
      // Arrange
      const predictionPeriodDropdown = element.all(by.css('md-select-value')).get(0);
      // Assert
      expect(predictionPeriodDropdown.getText()).toEqual('6 Months');
    });
    it('should have default page number selected as 1', () => {
      // Arrange
      const pageNumberDropdown = element.all(by.css('md-select-value')).get(1);
      // Assert
      expect(pageNumberDropdown.getText()).toEqual('1');
    });
    it('should have default rows per page selected as 5', () => {
      // Arrange
      const rowsPerPageDropdown = element.all(by.css('md-select-value')).get(2);
      // Assert
      expect(rowsPerPageDropdown.getText()).toEqual('5');
    });
    it('should by default have 5 rows in the table', () => {
      expect(element.all(by.css('table')).first().all(by.css('th')).count()).toBe(5);
    });
    it('should have table with heading 1 as Employee Name', () => {
      // Arrange
      const tableHeadings = element(
        by.xpath('/html/body/app/md-content/div/div[2]/md-content/md-card/md-table-container/table/thead[1]/tr/th[1]/span'),
      );
      // Assert
      expect(tableHeadings.getText()).toEqual('Employee Name');
    });
    it('should have table with heading 2 as Probability of Leaving the company', () => {
      // Arrange
      const tableHeadings = element(
        by.xpath('/html/body/app/md-content/div/div[2]/md-content/md-card/md-table-container/table/thead[1]/tr/th[2]/span'),
      );
      // Assert
      expect(tableHeadings.getText()).toEqual('Probability of Leaving the company');
    });
    it('should have table with heading 3 as Fire vs Quit', () => {
      // Arrange
      const tableHeadings = element(
        by.xpath('/html/body/app/md-content/div/div[2]/md-content/md-card/md-table-container/table/thead[1]/tr/th[3]/span'),
      );
      // Assert
      expect(tableHeadings.getText()).toEqual('Fire vs Quit');
    });
    it('should have table with heading 4 as Comments', () => {
      // Arrange
      const tableHeadings = element(
        by.xpath('/html/body/app/md-content/div/div[2]/md-content/md-card/md-table-container/table/thead[1]/tr/th[4]/span'),
      );
      // Assert
      expect(tableHeadings.getText()).toEqual('Comments');
    });
  });
});
