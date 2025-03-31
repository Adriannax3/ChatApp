import React, { use, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const avatars = ['🤠', '🧙🏻‍♀️','🧙🏻','🧝🏻','🤡','😎','🤓','👽','😺','🦆', '🐼', '🐟'];

const AvatarPicker = ({onSelect}) => {
    const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);

    return (
        <View style={styles.container}>
            <Text style={styles.currentAvatar}>{currentAvatar}</Text>
            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
                {avatars.map((avatar, index) => (
                    <TouchableOpacity key={index} onPress={() => {setCurrentAvatar(avatars[index]); onSelect(avatars[index]);}} style={[styles.avatarOption, currentAvatar === avatar && styles.selectedOption]}>
                    <Text style={styles.avatarOptionText}>{avatar}</Text>
                    </TouchableOpacity>
                ))};
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  currentAvatar: {
    fontSize: 50,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 50,
  },
  avatarOption: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25
  },
  avatarOptionText: {
    fontSize: 30,
  },
  selectedOption: {
    backgroundColor: "#fff"
  }
});

export default AvatarPicker;