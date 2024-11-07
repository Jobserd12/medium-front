
export const StatCard = ({ title, value, icon, color }) => (
    <div className="shadow col-sm-6 col-lg-3 text-black">
      <div className="card card-body border p-3">
        <div className="d-flex align-items-center">
          <div className={`icon-xl fs-1 p-3 bg-opacity-10 rounded-3 text-${color}`}>
            <i className={`${icon}`} />
          </div>
          <div className="ms-3">
            <h3>{value}</h3>
            <h6 className="mb-0">{title}</h6>
          </div>
        </div>
      </div>
      </div>

  );


