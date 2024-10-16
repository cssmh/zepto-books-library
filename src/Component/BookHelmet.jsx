import { Helmet } from "react-helmet-async";

const BookHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} - Books Library</title>
    </Helmet>
  );
};

export default BookHelmet;
