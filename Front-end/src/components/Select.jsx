function Select({ name, values, state, setState }) {
  return (
    <div>
      <label>{name}</label>
      <select
        value={state.CollaboratorId}
        onChange={({target}) => setState({
          ...state,
          CollaboratorId: target.value
        })}
      >
      <option value=''>--Select--</option>
      {
        values.length > 0 && (
          values.map((value) => (
            <option key={value._id} value={value._id}>{value.Name}</option>
          ))
        )
      }
    </select>
    </div>
  )
}

export default Select