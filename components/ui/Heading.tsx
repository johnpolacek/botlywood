const Heading = ({
	children,
}: {
	children: JSX.Element | JSX.Element[] | string
}) => (
	<h3 className={`text-2xl sm:text-3xl font-bold w-full pb-4`}>{children}</h3>
)

export default Heading
