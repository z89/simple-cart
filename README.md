## simple cart

a simple, strongly typed client-side carting implementation. Speed is not a concern since large arrays of products are unlikely to be used. The state logic uses a combination of the useContext & useReducer react hooks, as well as localStorage for persistence. Use at your own risk, handling client-side carting can be dangerous if you don't know what you're doing. This implementation <b>does not</b> include server-side carting checks, which are required for security.
