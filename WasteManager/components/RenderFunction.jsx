const renderPicker = (label, key, options) => {
    const [selectedValue, setSelectedValue] = useState(options[0].value);
  
    return (
      <View style={{ marginBottom: 20 }}>
        <Text>{label}</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {options.map((option) => (
            <Picker.Item label={option.label} value={option.value} key={option.value} />
          ))}
        </Picker>
      </View>
    );
  };