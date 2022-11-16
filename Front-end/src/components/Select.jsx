function Select({ name, values, tracker, setTracker }) {
  return (
    <div>
      <label>{name}</label>
      <select
        value={tracker.CollaboratorId}
        onChange={({target}) => setTracker({
          ...tracker,
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