import { Helmet } from "react-helmet-async";

const BookHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Book Library</title>
    </Helmet>
  );
};

export default BookHelmet;
