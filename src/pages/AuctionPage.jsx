import { useParams } from "react-router-dom";

function AuctionPage() {
  const { auctionId } = useParams();

  return <div>Auction Page: {auctionId || ""}</div>;
}

export default AuctionPage;
