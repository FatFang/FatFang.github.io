#ifndef DEQUE_H
#define DEQUE_H

// CLASS TEMPLATE DequeConstIterator
template< typename MyDeque >
class DequeConstIterator // iterator for nonmutable deque
{
private:
   using size_type = typename MyDeque::size_type;

public:
   using value_type = typename MyDeque::value_type;
   using difference_type = typename MyDeque::difference_type;
   using pointer = typename MyDeque::const_pointer;
   using reference = const value_type &;

   // construct with null pointer
   DequeConstIterator()
      : myOff( 0 ),
      myCont( nullptr )
   {
   }

   // construct with offset off in *pDeque
   DequeConstIterator( size_type off, const MyDeque *pDeque )
      : myOff( off ),
      myCont( pDeque )
   {
   }

   DequeConstIterator( const DequeConstIterator &right ) // copy constructor
      : myOff( right.myOff ),
      myCont( right.myCont )
   {
   }

   ~DequeConstIterator() // destructor
   {
   }

   // const return avoids: ( a1 = a2 ) = a3
   const DequeConstIterator& operator=( const DequeConstIterator &right )
   {
      if( &right != this ) // avoid self-assignment
      {
         myCont = right.myCont;
         myOff = right.myOff;
      }
      return *this; // enables x = y = z, for example
   }

   reference operator*() const
   {
//      size_type block = myOff % ( 4 * myCont->mapSize ) / 4;
      size_type block = myCont->getBlock( myOff );
      size_type off = myOff % 4;
      return myCont->map[ block ][ off ];
   }

   pointer operator->() const
   {
      return &( operator*() );
   }

   DequeConstIterator& operator++() // preincrement
   {
      ++myOff;
      return *this;
   }

   DequeConstIterator operator++( int ) // postincrement
   {
      DequeConstIterator tmp = *this;
      ++*this;
      return tmp;
   }

   DequeConstIterator& operator--() // predecrement
   {
      --myOff;
      return *this;
   }

   DequeConstIterator operator--( int ) // postdecrement
   {
      DequeConstIterator tmp = *this;
      --*this;
      return tmp;
   }

   // increment by integer
   DequeConstIterator& operator+=( const difference_type off )
   {
      myOff += off;
      return *this;
   }

   // return this + integer
   DequeConstIterator operator+( const difference_type off ) const
   {
      DequeConstIterator tmp = *this;
      return tmp += off;
   }

   // decrement by integer
   DequeConstIterator& operator-=( const difference_type off )
   {
      return *this += -off;
   }

   // return this - integer
   DequeConstIterator operator-( const difference_type off ) const
   {
      DequeConstIterator tmp = *this;
      return tmp -= off;
   }

   // return difference of iterators
   difference_type operator-( const DequeConstIterator &right ) const
   {
      return ( static_cast< difference_type >( this->myOff - right.myOff ) );
   }

   reference operator[]( const difference_type off ) const // subscript
   {
      return *( *this + off );
   }

   // test for iterator equality
   bool operator==( const DequeConstIterator &right ) const
   {
      return this->myCont == right.myCont && this->myOff == right.myOff;
   }

   // test for iterator inequality
   bool operator!=( const DequeConstIterator &right ) const
   {
      return !( *this == right );
   }

   // test if this < right
   bool operator<( const DequeConstIterator &right ) const
   {
      return this->myOff < right.myOff;
   }

   // test if this > right
   bool operator>( const DequeConstIterator &right ) const
   {
      return right < *this;
   }

   // test if this <= right
   bool operator<=( const DequeConstIterator &right ) const
   {
      return !( right < *this );
   }

   // test if this >= right
   bool operator>=( const DequeConstIterator &right ) const
   {
      return !( *this < right );
   }

   const MyDeque *myCont; // keep a pointer to deque
   size_type myOff;       // offset of element in deque
};


// CLASS TEMPLATE DequeIterator
template< typename MyDeque >
class DequeIterator : public DequeConstIterator< MyDeque >
{ // iterator for mutable deque
private:
   using size_type = typename MyDeque::size_type;
   using MyBase = DequeConstIterator< MyDeque >;

public:
   using value_type = typename MyDeque::value_type;
   using difference_type = typename MyDeque::difference_type;
   using pointer = typename MyDeque::pointer;
   using reference = value_type &;

   using MyBase::MyBase;

   DequeIterator() // construct with null deque pointer
   {
   }

   DequeIterator( size_type off, const MyDeque *pDeque )
      : MyBase( off, pDeque ) // construct with offset off in *pDeque
   {
   }

   reference operator*() const // return designated object
   {
      return const_cast< reference >( MyBase::operator*() );
   }

   pointer operator->() const // return pointer to class object
   {
      return const_cast< pointer >( MyBase::operator->() );
      //      return &( operator*() );
   }

   DequeIterator& operator++() // preincrement
   {
      MyBase::operator++();
      return *this;
   }

   DequeIterator operator++( int ) // postincrement
   {
      DequeIterator tmp = *this;
      MyBase::operator++();
      return tmp;
   }

   DequeIterator& operator--() // predecrement
   {
      MyBase::operator--();
      return *this;
   }

   DequeIterator operator--( int ) // postdecrement
   {
      DequeIterator tmp = *this;
      MyBase::operator--();
      return tmp;
   }

   // increment by integer
   DequeIterator& operator+=( const difference_type off )
   {
      MyBase::operator+=( off );
      return *this;
   }

   // return this + integer
   DequeIterator operator+( const difference_type off ) const
   {
      DequeIterator tmp = *this;
      return tmp += off;
   }

   // decrement by integer
   DequeIterator& operator-=( const difference_type off )
   {
      MyBase::operator-=( off );
      return *this;
   }

   using MyBase::operator-; // return difference of iterators

   // return this - integer
   DequeIterator operator-( const difference_type off ) const
   {
      DequeIterator tmp = *this;
      return tmp -= off;
   }

   reference operator[]( const difference_type off ) const // subscript
   {
      return const_cast< reference >( MyBase::operator[]( off ) );
   }
};

// CLASS TEMPLATE DequeVal
template< typename Ty >
class DequeVal // base class for deque to hold data
{
public:
   using value_type = Ty;
   using size_type = size_t;
   using difference_type = ptrdiff_t;
   using pointer = value_type *;
   using const_pointer = const value_type *;
   using reference = value_type &;
   using const_reference = const value_type &;
   using MapPtr = Ty **;

   DequeVal() // initialize values
      : map(),
      mapSize( 0 ),
      myOff( 0 ),
      mySize( 0 )
   {
   }

   // determine block from offset
   size_type getBlock( size_type off ) const
   {
      return off % ( 4 * mapSize ) / 4;
      //      return ( off / 4 ) & ( mapSize - 1 );
   }

   MapPtr map;        // pointer to array of pointers to blocks
   size_type mapSize; // size of map array, zero or 2^N
   size_type myOff;   // offset of initial element
   size_type mySize;  // current length of sequence
};


// CLASS TEMPLATE deque
template< typename Ty >
class deque // circular queue of pointers to blocks
{
private:
   using MapPtr = Ty **;
   using ScaryVal = DequeVal< Ty >;

public:
   using value_type = Ty;
   using size_type = size_t;
   using difference_type = ptrdiff_t;
   using pointer = value_type *;
   using const_pointer = const value_type *;
   using reference = value_type &;
   using const_reference = const value_type &;

   using iterator = DequeIterator< ScaryVal >;
   using const_iterator = DequeConstIterator< ScaryVal >;

   // construct empty deque
   deque()
      : myData()
   {
   }

   // construct from count * val
   deque( size_type count, const value_type &val )
      : myData()
   {
      myData.map = new value_type * [ 8 ]();
      myData.map[ 0 ] = new value_type[ 4 ];
      myData.map[ 0 ][ 0 ] = val;
      myData.mapSize = 8;
      myData.mySize = count;
   }

   // construct by copying right
   deque( const deque &right )
      : myData()
   {
       if (right.myData.mySize > 0)
       {
           myData.mapSize = 8;
           while ((myData.mapSize - 1) * 4 < right.myData.mySize) {
               myData.mapSize *= 2;
           }
           myData.map = new value_type * [myData.mapSize]();
           for (size_t i = 0; i < myData.mapSize; i++) {
               myData.map[i] = nullptr;
           }

           size_t local_col = 0, local_row = 0;
           size_t right_col = right.myData.myOff / 4, right_row = right.myData.myOff % 4;
           size_t rightTmpMyOff = right.myData.myOff;
           for (size_t i = 0; i < right.myData.mySize; i++) {
               if (local_row > 3) {
                   local_row = 0;
                   local_col += 1;
               }

               if (myData.map[local_col] == nullptr) {
                   myData.map[local_col] = new value_type[4];
               }


               rightTmpMyOff %= (4 * right.myData.mapSize);

               right_col = rightTmpMyOff / 4;
               right_row = rightTmpMyOff % 4;

               myData.map[local_col][local_row] = right.myData.map[right_col][right_row];
               rightTmpMyOff += 1;
               local_row += 1;
           }
           myData.mySize = right.myData.mySize;
       }
       else {
           myData.mapSize = 0;
       }
   }

   // destroy the deque
   ~deque()
   {
      clear();
   }

   // return iterator for beginning of mutable sequence
   iterator begin()
   {
      return iterator( myData.myOff, &myData );
   }

   // return iterator for beginning of nonmutable sequence
   const_iterator begin() const
   {
      return const_iterator( myData.myOff, &myData );
   }

   // return iterator for end of mutable sequence
   iterator end()
   {
      return iterator( myData.myOff + myData.mySize, &myData );
   }

   // return iterator for end of nonmutable sequence
   const_iterator end() const
   {
      return const_iterator( myData.myOff + myData.mySize, &myData );
   }

   iterator makeIter( const_iterator where ) const
   {
      return iterator( where.myOff, &myData );
   }

   // return length of sequence
   size_type size() const
   {
      return myData.mySize;
   }

   // test if sequence is empty
   bool empty() const
   {
      return myData.mySize == 0;
   }

   // erase element at beginning
   void pop_front()
   {
      size_type front = myData.myOff % ( 4 * myData.mapSize );
      if( front % 4 == 3 )
      {
         size_type back = ( myData.myOff + myData.mySize - 1 ) % ( 4 * myData.mapSize );
         if( back >= front - 3 && back < front )
         {
            delete[] myData.map[ ( front - 3 ) / 4 ];
            myData.map[ ( front - 3 ) / 4 ] = nullptr;
         }
      }

      --myData.mySize;
      if( myData.mySize == 0 )
         myData.myOff = 0;
      else
         ++myData.myOff;
   }

   // erase element at end
   void pop_back()
   {
      size_type back = ( myData.myOff + myData.mySize - 1 ) % ( 4 * myData.mapSize );
      if( back % 4 == 0 )
      {
         size_type front = myData.myOff % ( 4 * myData.mapSize );
         if( front > back && front <= back + 3 )
         {
            delete[] myData.map[ back / 4 ];
            myData.map[ back / 4 ] = nullptr;
         }
      }

      --myData.mySize;
      if( myData.mySize == 0 )
         myData.myOff = 0;
   }

   // insert val at where
   void insert( const_iterator where, const value_type &val )
   {
      size_type off = static_cast< size_type >( where - begin() );
      if( myData.mySize == 0 )
      {
         if( where == begin() && where == end() )
         {
             if (myData.mapSize == 0) {
                 myData.map = new value_type * [8]();
                 myData.mapSize = 8;
             }
             size_t col = off / 4,row = off % 4;
             if (myData.map[col] == nullptr) {
                 myData.map[col] = new value_type[4];
             }
             
             myData.map[col][row] = val;
             myData.mySize += 1;
         }
      }
      else
      {
         if( begin() <= where && where <= end() )
         {
            // all elements before where move forward
            if( where <= begin() + myData.mySize / 2 )
            {
               size_type newFront = ( myData.myOff - 1 ) % ( 4 * myData.mapSize );
               if( newFront % 4 == 3 && myData.mySize >= 4 * ( myData.mapSize - 1 ) )
               {
                  doubleMapSize();
                  newFront = ( myData.myOff - 1 ) % ( 4 * myData.mapSize );
               }
            
               size_t minusMyOff = (myData.myOff - 1) % (4 * myData.mapSize);
               
               size_t newStart_col = getBlock(minusMyOff), newStart_row = minusMyOff % 4;
               if (myData.myOff % 4 == 0) {
                   myData.map[newStart_col] = new value_type[4];
               }
                /*
               myData.myOff -= 1;
               myData.myOff %= (4 * myData.mapSize);*/
               size_t newStart_col_addOne = 0, newStart_row_addOne = 0;

               
               for (size_t i = 0;i < off;i++) {
                   minusMyOff %= (4 * myData.mapSize);
                   newStart_col = getBlock(minusMyOff);
                   newStart_row = minusMyOff % 4;

                   minusMyOff += 1;
                   minusMyOff %= (4 * myData.mapSize);
                   newStart_col_addOne = getBlock(minusMyOff);
                   newStart_row_addOne = minusMyOff % 4;
                   
                   myData.map[newStart_col][newStart_row] = myData.map[newStart_col_addOne][newStart_row_addOne];
               }
               minusMyOff %= (4 * myData.mapSize);
               newStart_col = getBlock(minusMyOff);
               newStart_row = minusMyOff % 4;
               myData.map[newStart_col][newStart_row] = val;
               myData.mySize += 1; 
                myData.myOff = newFront;
            }
            else  // all elements after (and at) where move backward
            {
               size_type newBack = ( myData.myOff + myData.mySize ) % ( 4 * myData.mapSize );
               if( newBack % 4 == 0 && myData.mySize >= 4 * ( myData.mapSize - 1 ) )
               {
                  doubleMapSize();
                  newBack = myData.myOff + myData.mySize;
               }
               size_t addMyOff = (myData.myOff + myData.mySize) % (4 * myData.mapSize);
               size_t back = (myData.myOff + myData.mySize - 1) % (4 * myData.mapSize);
               size_t newStart_col = getBlock(addMyOff), newStart_row = addMyOff % 4;
               if (back % 4 == 3) {
                   myData.map[newStart_col] = new value_type[4];
               }
               size_t newStart_col_addOne= 0, newStart_row_addOne =0;
               for (size_t i = 0; i < myData.mySize - off; i++) {
                   addMyOff %= (4 * myData.mapSize);
                   newStart_col = getBlock(addMyOff);
                   newStart_row = addMyOff % 4;
                   
                   addMyOff -= 1;
                   addMyOff %= (4 * myData.mapSize);
                   newStart_col_addOne = getBlock(addMyOff);
                   newStart_row_addOne = addMyOff % 4;

                   myData.map[newStart_col][newStart_row] = myData.map[newStart_col_addOne][newStart_row_addOne];
                   
               }
               addMyOff %= (4 * myData.mapSize);
               newStart_col = getBlock(addMyOff);
               newStart_row = addMyOff % 4;
               myData.map[newStart_col][newStart_row] = val;
               myData.mySize += 1;
            }
         }
      }
   }

   // erase element at where
   void erase( const_iterator where )
   {
      iterator whereIt = makeIter( where );

      if( myData.mySize > 0 && begin() <= whereIt && whereIt < end() )
         if( whereIt < begin() + myData.mySize / 2 ) // all elements before where move backward
         {

            pop_front(); // pop copied element
         }
         else // all elements after where move forward
         {
             for (auto i = --end(); i != whereIt;) {
                 iterator itmp = i;
                 *(++i) = *itmp;
             }
            pop_back(); // pop copied element
         }
   }

   // erase all
   void clear()
   {
      if( myData.mapSize > 0 )
      {
         for( size_type i = 0; i < myData.mapSize; i++ )
            if( myData.map[ i ] != nullptr )
               //delete[] myData.map[ i ];
         //delete[] myData.map;

         myData.mapSize = 0;
         myData.mySize = 0;
         myData.myOff = 0;
         myData.map = nullptr;
      }
   }

private:

   // determine block from offset
   size_type getBlock( size_type off ) const
   {
      return myData.getBlock( off );
//      return ( ( myData.off / 4 ) & ( myData.mapSize - 1 ) );
   }

   void doubleMapSize()
   {
      if( myData.mapSize > 0 )
      {
          auto newMap = new value_type * [2 * myData.mapSize];
          size_t oldFront = getBlock(myData.myOff);
          size_t back = (myData.myOff + myData.mySize - 1) % (4 * myData.mapSize);
          size_t oldBack = getBlock(back);

          if (oldFront > oldBack) {
              for (auto i = oldFront;i < myData.mapSize;i++) {
                  newMap[i] = myData.map[i];
              }
              for (size_t i = 0;i <= oldBack;i++) {
                  newMap[i + myData.mapSize] = myData.map[i];
              }
          }
          else {
              for (auto i = oldFront;i <= oldBack;i++) {
                  newMap[i] = myData.map[i];
              }
          
          }
          delete[] myData.map;
          myData.map = newMap;
          myData.mapSize *= 2;
      }
   }

   ScaryVal myData;
};

#endif
