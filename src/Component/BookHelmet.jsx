import { Helmet } from "react-helmet-async";

const BookHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | ZeptoBooks</title>
    </Helmet>
  );
};

export default BookHelmet;
