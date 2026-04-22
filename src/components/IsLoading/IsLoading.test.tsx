import { render, screen } from "@testing-library/react";
import IsLoading from "./IsLoading";

// Si jamais je suis en train de charger, j'affiche loading,
// Sinon, j'affiche le composant enfant

describe("IsLoading Component", () => {
  it("should return Loading... text when loading is true", () => {
    render(
      <IsLoading loading={true}>
        <p>Hello world</p>
      </IsLoading>,
    );
    screen.getByText(/loading.../i);
  });

  it("should not return children when loading is true", () => {
    render(
      <IsLoading loading={true}>
        <p>Hello world</p>
      </IsLoading>,
    );
    const children = screen.queryByText(/Hello world/i);
    expect(children).not.toBeInTheDocument();
  });

  it("should not return loading text when the loading is false", () => {
    render(
      <IsLoading loading={false}>
        <p>Hello world</p>
      </IsLoading>,
    );
    const element = screen.queryByText(/loading.../i);

    expect(element).toBeNull();
  });

  it("should return the children when the loading is false", () => {
    render(
      <IsLoading loading={false}>
        <p>Hello world</p>
      </IsLoading>,
    );
    screen.getByText(/Hello world/i);
  });
});
