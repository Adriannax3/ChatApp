import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet,
  KeyboardAvoidingView, Platform, Pressable, SafeAreaView
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';

export default function ChatScreen() {
  const { theme } = useTheme();
  const route = useRoute();
  const { friend } = route.params;
  const { user, token } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const socketRef = useRef(null);
  const flatListRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/messages', {
        headers: { Authorization: `Bearer ${token}` },
        params: { fromUserId: user._id, toUserId: friend._id },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Błąd pobierania wiadomości:", err);
    }
  };

  useEffect(() => {
    socketRef.current = io('http://157.158.162.124:8080', {
      query: { userId: user._id },
      transports: ['websocket']
    });

    socketRef.current.on('receiveMessage', ({ newMessage }) => {
      setMessages(prev => [...prev, newMessage]);
    });

    socketRef.current.on('messagesMarkedRead', ({ peerUserId }) => {
      if (peerUserId !== friend._id) return;
      setMessages(prev => prev.map(m =>
        (m.fromUserId === friend._id && !m.isRead) ? { ...m, isRead: true } : m
      ));
    });

    socketRef.current.on('messageRead', ({ messageId }) => {
      setMessages(prev => prev.map(m => m._id === messageId ? { ...m, isRead: true } : m));
    });

    fetchMessages();
    socketRef.current.emit('openThread', { peerUserId: friend._id });

    return () => { socketRef.current?.disconnect(); };
  }, [friend._id]);

  useEffect(() => {
    if (flatListRef.current) flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socketRef.current.emit('sendMessage', { toUserId: friend._id, message: input });
    setInput('');
  };

  const renderItem = ({ item }) => {
    const mine = item.fromUserId === user._id;
    const unreadFromPeer = !mine && item.isRead === false;
    return (
      <View
        style={[
          styles.messageBubble,
          mine ? [styles.myMessage, { backgroundColor: theme.colors.primary }] : styles.theirMessage,
          unreadFromPeer && styles.unreadBadge
        ]}
      >
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 32, backgroundColor: theme.colors.backgroundColor }}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.colors.backgroundColor }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesContainer}
        />

        <View style={[styles.inputContainer, { backgroundColor: theme.colors.backgroundColor }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Napisz wiadomość..."
            placeholderTextColor="#888"
            style={[styles.input, { color: theme.colors.text, backgroundColor: theme.colors.secondaryBackground }]}
          />
          <Pressable onPress={sendMessage} style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.sendText, { color: theme.colors.text }]}>Wyślij</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  messagesContainer: { padding: 16 },
  messageBubble: { padding: 10, borderRadius: 12, marginVertical: 4, maxWidth: '80%' },
  myMessage: { alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#e5e5ea', alignSelf: 'flex-start' },
  unreadBadge: { borderWidth: 1, borderColor: '#ff3b30' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 8 },
  input: { flex: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f2f2f2', marginRight: 8 },
  sendButton: { borderRadius: 20, paddingVertical: 10, paddingHorizontal: 16, justifyContent: 'center' },
  sendText: { color: 'white', fontWeight: '600' },
});
