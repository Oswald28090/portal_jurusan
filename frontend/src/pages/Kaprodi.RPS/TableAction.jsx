import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./TableAction.scss"

const TableAction = () => {
  return (
    <>
      <div className="action-buttons-kaprodi">
        <Link to="/kaprodi/view/rps" className="action-button blue">
          <HiOutlineEye size={18} />
        </Link>
        <Link to="/delete" className="action-button red">
          <HiOutlineTrash size={18} />
        </Link>
      </div>
    </>
  );
};

export default TableAction;
