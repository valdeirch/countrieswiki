import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, FormControl, Navbar } from "react-bootstrap";

export function Header() {
    const history = useHistory();

    const handleOnTextChange = useCallback(
        (event) => {
          if (event?.target?.value && event?.target?.value !== "") {
            history.push(`/?search=${event?.target?.value}`);
          } else {
            history.push(`/`);
          }
        },
        [history]
      );

    return (
        <header>
            <Navbar className="bg-light justify-content-between">
                <Link to="/">
                    <Navbar.Brand>Countries Wiki</Navbar.Brand>
                </Link>
                <Form inline>
                    <FormControl type="text" placeholder="Search Countries" className=" mr-sm-2" onChange={handleOnTextChange}/>
                </Form>
            </Navbar>
        </header>
    )
}