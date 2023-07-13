import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  let message = "";
  if ("statusText" in error) {
    message = error.statusText;
  }
  if (message.length < 1 && "message" in error) {
    message = error.message;
  }

  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}
