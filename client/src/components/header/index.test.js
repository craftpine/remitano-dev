import Header from "./index";
import { BrowserRouter } from "react-router-dom";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";

// Enzyme.configure({ adapter: new Adapter() })
configure({ adapter: new Adapter() });
describe("Testing Header Component", () => {
  test("check if heading is correct", () => {
    const token = localStorage.getItem("token");
    console.log(token);
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(
      <Router>
        <Header />
      </Router>
    );
    expect(wrapper.find("span.ms-2.fs-2.fw-bold").text()).toMatch(
      /Funny Movies/
    );
    if (!token) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(wrapper.find("button.btn.btn-primary").text()).toMatch(/Login/);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(wrapper.find("a.text-decoration-none.text-white").text()).toMatch(
        /Share a movie/
      );
    }
  });
});
