import { useEffect, useRef } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { ReceiptObject } from "../../lib/receiptObject.ts";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarListLink from "./SidebarListLink.tsx";

function Sidebar() {
  const { receipts, q } = useLoaderData() as {
    receipts: ReceiptObject[];
    q: string;
  };

  const navigation = useNavigation();
  const searchRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = q;
    }
  }, [q]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  return (
    <>
      <Button m={4} ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Receipts
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Receipts</DrawerHeader>

          <DrawerBody>
            <div>
              <Form id="search-form" role="search">
                <Input
                  id="q"
                  className={searching ? "loading" : ""}
                  aria-label="Search contacts"
                  placeholder="Search"
                  type="search"
                  name="q"
                  defaultValue={q}
                  onChange={(event) => {
                    const isFirstSearch = q == null;
                    submit(event.currentTarget.form, {
                      replace: !isFirstSearch,
                    });
                  }}
                />
                <div id="search-spinner" aria-hidden hidden={!searching} />
                <div className="sr-only" aria-live="polite"></div>
              </Form>
              <hr />
            </div>
            {receipts.length ? (
              <List marginY={4} spacing={3} key={"x"}>
                {receipts.map((receipt) => (
                  <ListItem key={receipt.id + "xa"}>
                    {/*<NavLink
                      to={`receipt/${receipt.id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "navLink active"
                          : isPending
                          ? "navLink pending"
                          : "navLink"
                      }
                      onClick={onClose}
                    >
                      {receipt.name ? <>{receipt.name}</> : <i>Unnamed</i>}{" "}
                      {receipt.favorite && <span>★</span>}
                    </NavLink>*/}
                    <SidebarListLink receipt={receipt} onClose={onClose} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text>
                <i>No receipts</i>
              </Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Form method="post">
              <Button
                marginY={"4"}
                colorScheme="blue"
                type={"submit"}
                onClick={onClose}
              >
                New Receipt
              </Button>
            </Form>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
