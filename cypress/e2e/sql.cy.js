describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES 
      (1, "Ivan", "07-2023", "Barcelona"),
      (2, "Maria", "10-2023", "Milan"),
      (3, "Igor", "12-2023", "London"),
      (4, "Polina", "01-2024", "Moscow");`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(4);
    });
  });

  it("select by city", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City="Milan"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Maria");
    });
  });

  it("input new entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES 
      (5, "Sergey", "10-2023", "Verona"),
      (6, "Daria", "10-2023", "Milan");`
    );
  });

  it("select by group", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName, City FROM Students WHERE StudentGroup="10-2023"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[2].FirstName).to.equal("Daria");
    });
  });

  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
