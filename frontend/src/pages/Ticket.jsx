import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTicket, closeTicket } from "../features/ticket/ticketSlice";
import { getNotes, reset as noteReset } from "../features/notes/noteSlice";
import BackButton from "../component/BackButton";
import Spinner from "../component/Spinner";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoteItem from "../component/NoteItem";

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.notes
  );

  const params = useParams();

  const dispatch = useDispatch();

  const { ticketId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  // closed ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />

        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>

        <h2>Notes</h2>

        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </header>

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
