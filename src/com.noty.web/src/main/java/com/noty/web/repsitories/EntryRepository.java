package com.noty.web.repsitories;

import com.noty.web.entities.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {

    void deleteByListId(long listId);

}
