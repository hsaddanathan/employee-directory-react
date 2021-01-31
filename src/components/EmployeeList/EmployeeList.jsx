import axios from "axios";
import React, { Component } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

class EmployeeList extends Component {
  state = {
    employees: [],
    filteredEmployees: [],
    search: "",
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    axios.get("https://randomuser.me/api/?results=125").then((response) => {
      console.log(response.data.results);
      this.setState({
        employees: response.data.results,
        filteredEmployees: response.data.results,
      });
    });
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;
    const filterEmployees = this.state.employees.filter((employee) => {
        return employee.location.city.includes(value);
    })
    this.setState({
      [name]: value,
      filteredEmployees: filterEmployees,
    });
  };
  handleSortDownName = () => {
      const sortedReverse = this.state.filteredEmployees.sort((a,b) => {
          return a.name.first > b.name.first ? -1 : 1;
      });
      this.setState({
          filteredEmployees: sortedReverse
      });
  }

  handleSortUpName = () => {
    const sortedReverse = this.state.filteredEmployees.sort((a,b) => {
        return a.name.first > b.name.first ? 1 : -1;
    });
    this.setState({
        filteredEmployees: sortedReverse
    });
}
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center"></div>
            <div className="col-md-4 text-center">
              <input
                className="form-control py-3 mt-4"
                type="text"
                name="search"
                onChange={this.handleInputChange}
                value={this.state.search}
                placeholder="Search by City"
              />
            </div>
            <div className="col-md-4 text-center"></div>
          </div>
          <div className="col-md-12">
            <table className="table table-success table-striped">
              <thead className="text-center">
                <tr>
                  <th scope="col">Picture</th>
                  <th scope="col">
                    <span>
                      <button onClick={this.handleSortUpName}>
                        <i className="fas fa-angle-double-up"></i>
                      </button>
                      <span>Name</span>
                      <button onClick={this.handleSortDownName}>
                        <i className="fas fa-angle-double-down"></i>
                      </button>
                    </span>
                  </th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">City</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredEmployees.map((results) => {
                  return (
                    <tr key={results.login.uuid}>
                      <th
                        scope="row"
                        className="text-center"
                      >
                        <img src={results.picture.medium} alt="" />
                      </th>
                      <td className="text-center">
                        {results.name.first} {results.name.last}
                      </td>
                      <td className="text-center">{results.cell}</td>
                      <td className="text-center">{results.email}</td>
                      <td className="text-center">{results.location.city}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
