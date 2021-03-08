package com.nts.insw.dao;

public class Select<T,V> {

  private T id;

  private V value;

  public Select(T id, V value) {
    this.id = id;
    this.value = value;
  }

  public T getId() {
    return id;
  }

  public void setId(T id) {
    this.id = id;
  }

  public V getValue() {
    return value;
  }

  public void setValue(V value) {
    this.value = value;
  }
}
