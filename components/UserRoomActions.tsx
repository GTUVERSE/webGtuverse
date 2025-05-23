"use client";
import { useState } from "react";
import {
  getUsers,
  getRooms,
  createRoom,
  addUserToRoom,
  getRoomUsers,
} from "@/lib/apiClient";

export default function UserRoomActions() {
  const [users, setUsers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomName, setRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [roomUsers, setRoomUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Kullanıcılar yüklenemedi.");
    }
    setLoading(false);
  }

  async function fetchRooms() {
    setLoading(true);
    setError("");
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err: any) {
      setError(err.message || "Odalar yüklenemedi.");
    }
    setLoading(false);
  }

  async function handleCreateRoom() {
    if (!roomName) return;
    setLoading(true);
    setError("");
    try {
      const data = await createRoom({ name: roomName });
      setMessage(`Oda oluşturuldu: ${data.name}`);
      setRoomName("");
      fetchRooms();
    } catch (err: any) {
      setError(err.message || "Oda oluşturulamadı.");
    }
    setLoading(false);
  }

  async function handleAddUserToRoom() {
    if (!selectedRoom || !selectedUser) return;
    setLoading(true);
    setError("");
    try {
      await addUserToRoom(selectedRoom, selectedUser);
      setMessage("Kullanıcı odaya eklendi");
      fetchRoomUsers(selectedRoom);
    } catch (err: any) {
      setError(err.message || "Kullanıcı eklenemedi.");
    }
    setLoading(false);
  }

  async function fetchRoomUsers(roomId: number) {
    setLoading(true);
    setError("");
    try {
      const data = await getRoomUsers(roomId);
      setRoomUsers(data);
    } catch (err: any) {
      setError(err.message || "Oda kullanıcıları yüklenemedi.");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold">Kullanıcı ve Oda İşlemleri</h2>
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      <div className="flex gap-2">
        <button onClick={fetchUsers} className="px-3 py-1 bg-blue-500 text-white rounded">Kullanıcıları Getir</button>
        <button onClick={fetchRooms} className="px-3 py-1 bg-green-500 text-white rounded">Odaları Getir</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Oda adı"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          className="border px-2 py-1 rounded mr-2"
        />
        <button onClick={handleCreateRoom} className="px-3 py-1 bg-purple-500 text-white rounded">Oda Oluştur</button>
      </div>
      <div>
        <label>Oda seç:</label>
        <select value={selectedRoom ?? ""} onChange={e => {
          const val = Number(e.target.value);
          setSelectedRoom(val);
          fetchRoomUsers(val);
        }} className="ml-2 border rounded px-2 py-1">
          <option value="">Seçiniz</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>{room.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Kullanıcı seç:</label>
        <select value={selectedUser ?? ""} onChange={e => setSelectedUser(Number(e.target.value))} className="ml-2 border rounded px-2 py-1">
          <option value="">Seçiniz</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <button onClick={handleAddUserToRoom} className="ml-2 px-3 py-1 bg-orange-500 text-white rounded">Odaya Ekle</button>
      </div>
      {selectedRoom && (
        <div>
          <h3 className="font-semibold mt-4">Odadaki Kullanıcılar</h3>
          <ul>
            {roomUsers.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
      {loading && <div>Yükleniyor...</div>}
      {message && <div className="text-green-600">{message}</div>}
    </div>
  );
} 