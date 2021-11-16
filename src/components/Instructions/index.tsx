const Instructions = () => {
  return (
    <div className="container">
      <div className="row justify-content-sm-center">
        <div className="col col-sm-6 rounded my-2 bg-danger bg-gradient bg-opacity-10">
          <h5 className="d-sm-none text-center">
            Instructions
            <br />
            Tap -{">"} Max
            <br />
            Long Press -{">"} Lewis
          </h5>
          <h5 className="d-none d-sm-block text-center">
            Instructions
            <br />
            Left Click -{">"} Max
            <br />
            Right Click -{">"} Lewis
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
