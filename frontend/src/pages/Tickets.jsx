import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/ticket/ticketSlice";
import Spinner from "../component/Spinner";
import BackButton from "../component/BackButton";
import TicketItem from "../component/TicketItem";

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div className="">Date</div>
          <div className="">Product</div>
          <div className="">Status</div>
          <div className="">Date</div>
        </div>

        {tickets.map((ticket) => {
          return <TicketItem key={ticket._id} ticket={ticket} />;
        })}
      </div>
    </>
  );
}

export default Tickets;
