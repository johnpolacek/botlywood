const Heading = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string
}) => (
  <h3
    style={{ textShadow: "#000 0 0 4px" }}
    className={`text-2xl sm:text-3xl font-bold w-full pb-4`}
  >
    {children}
  </h3>
)

export default Heading
